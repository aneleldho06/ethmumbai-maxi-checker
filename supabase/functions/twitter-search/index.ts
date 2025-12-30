import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { username } = await req.json();

    if (!username) {
      return new Response(
        JSON.stringify({ error: 'Username is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const cleanUsername = username.replace('@', '').trim();
    console.log(`Searching tweets for username: ${cleanUsername}`);

    const bearerToken = Deno.env.get('TWITTER_BEARER_TOKEN');

    if (!bearerToken) {
      console.error('TWITTER_BEARER_TOKEN not configured');
      return new Response(
        JSON.stringify({ 
          error: 'Twitter API not configured',
          fallback: true 
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // First, get user ID from username
    console.log(`Fetching user ID for @${cleanUsername}`);
    const userResponse = await fetch(
      `https://api.twitter.com/2/users/by/username/${cleanUsername}?user.fields=profile_image_url`,
      {
        headers: {
          'Authorization': `Bearer ${bearerToken}`,
        },
      }
    );

    if (!userResponse.ok) {
      const errorText = await userResponse.text();
      console.error(`User lookup failed: ${userResponse.status} - ${errorText}`);
      return new Response(
        JSON.stringify({ 
          error: `User lookup failed: ${userResponse.status}`,
          fallback: true 
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const userData = await userResponse.json();
    
    if (!userData.data) {
      console.error('User not found:', userData);
      return new Response(
        JSON.stringify({ 
          error: 'User not found',
          fallback: true 
        }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const userId = userData.data.id;
    const profileImageUrl = userData.data.profile_image_url?.replace('_normal', '_400x400') || null;
    console.log(`Found user ID: ${userId}, profile image: ${profileImageUrl}`);

    // Search for tweets mentioning ETHMumbai from this user
    const searchQuery = `from:${cleanUsername} (ETHMumbai OR #ETHMumbai OR @ETHMumbai)`;
    console.log(`Search query: ${searchQuery}`);

    const searchResponse = await fetch(
      `https://api.twitter.com/2/tweets/search/recent?query=${encodeURIComponent(searchQuery)}&max_results=100&tweet.fields=referenced_tweets,created_at,text`,
      {
        headers: {
          'Authorization': `Bearer ${bearerToken}`,
        },
      }
    );

    if (!searchResponse.ok) {
      const errorText = await searchResponse.text();
      console.error(`Search failed: ${searchResponse.status} - ${errorText}`);
      
      // Check if it's a rate limit or access issue
      if (searchResponse.status === 403) {
        return new Response(
          JSON.stringify({ 
            error: 'Twitter API access denied. You may need elevated access for search.',
            fallback: true 
          }),
          { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      return new Response(
        JSON.stringify({ 
          error: `Search failed: ${searchResponse.status}`,
          fallback: true 
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const searchData = await searchResponse.json();
    console.log(`Search response:`, JSON.stringify(searchData));

    let originalCount = 0;
    let replyCount = 0;
    let retweetCount = 0;

    if (searchData.data && Array.isArray(searchData.data)) {
      for (const tweet of searchData.data) {
        const referencedTweets = tweet.referenced_tweets || [];
        const isRetweet = referencedTweets.some((ref: { type: string }) => ref.type === 'retweeted');
        const isReply = referencedTweets.some((ref: { type: string }) => ref.type === 'replied_to');
        const isQuote = referencedTweets.some((ref: { type: string }) => ref.type === 'quoted');

        if (isRetweet) {
          retweetCount++;
        } else if (isReply) {
          replyCount++;
        } else {
          originalCount++;
        }

        console.log(`Tweet: ${tweet.text?.substring(0, 50)}... | RT: ${isRetweet}, Reply: ${isReply}, Quote: ${isQuote}`);
      }
    }

    const totalMentions = originalCount + replyCount + retweetCount;
    console.log(`Results - Original: ${originalCount}, Replies: ${replyCount}, Retweets: ${retweetCount}, Total: ${totalMentions}`);

    return new Response(
      JSON.stringify({
        originalCount,
        replyCount,
        retweetCount,
        totalMentions,
        profileImageUrl,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: unknown) {
    console.error('Error in twitter-search function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ 
        error: errorMessage,
        fallback: true 
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
