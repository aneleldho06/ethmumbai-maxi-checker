import { Scraper, SearchMode } from "https://esm.sh/@the-convocation/twitter-scraper@0.9.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface TweetData {
  id: string;
  text: string;
  isRetweet: boolean;
  isReply: boolean;
  username: string;
  timestamp: number;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
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

    // Initialize scraper
    const scraper = new Scraper();
    
    // Get Twitter credentials from environment
    const twitterUsername = Deno.env.get('TWITTER_USERNAME');
    const twitterPassword = Deno.env.get('TWITTER_PASSWORD');
    const twitterCookies = Deno.env.get('TWITTER_COOKIES');

    // Try to login with cookies first, then credentials
    if (twitterCookies) {
      try {
        const cookies = JSON.parse(twitterCookies);
        await scraper.setCookies(cookies);
        console.log('Set cookies from environment');
      } catch (e) {
        console.error('Error setting cookies:', e);
      }
    }

    if (!(await scraper.isLoggedIn())) {
      if (twitterUsername && twitterPassword) {
        console.log('Logging in with credentials...');
        await scraper.login(twitterUsername, twitterPassword);
        
        if (!(await scraper.isLoggedIn())) {
          throw new Error('Failed to login to Twitter');
        }
        console.log('Logged in successfully');
      } else {
        console.log('No credentials provided, attempting without login');
      }
    }

    // Search for ETHMumbai tweets from the user
    const searchQuery = `from:${cleanUsername} (ETHMumbai OR #ETHMumbai OR @ETHMumbai)`;
    console.log(`Search query: ${searchQuery}`);

    const tweets: TweetData[] = [];
    let originalCount = 0;
    let replyCount = 0;
    let retweetCount = 0;

    try {
      const searchResults = scraper.searchTweets(searchQuery, 100, SearchMode.Latest);
      
      for await (const tweet of searchResults) {
        if (!tweet.id || !tweet.text) continue;
        
        const tweetData: TweetData = {
          id: tweet.id,
          text: tweet.text,
          isRetweet: tweet.isRetweet ?? false,
          isReply: !!tweet.inReplyToStatusId,
          username: tweet.username ?? cleanUsername,
          timestamp: tweet.timestamp ?? Date.now() / 1000,
        };
        
        tweets.push(tweetData);
        
        // Count by type
        if (tweetData.isRetweet) {
          retweetCount++;
        } else if (tweetData.isReply) {
          replyCount++;
        } else {
          originalCount++;
        }
      }
    } catch (searchError) {
      console.error('Search error:', searchError);
    }

    const totalMentions = tweets.length;
    console.log(`Found ${totalMentions} tweets - Original: ${originalCount}, Replies: ${replyCount}, Retweets: ${retweetCount}`);

    return new Response(
      JSON.stringify({
        username: cleanUsername,
        originalCount,
        replyCount,
        retweetCount,
        totalMentions,
        tweets: tweets.slice(0, 10),
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error: unknown) {
    console.error('Error in twitter-search function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch tweets';
    return new Response(
      JSON.stringify({ 
        error: errorMessage,
        fallback: true 
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
