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

async function loginWithRetry(scraper: Scraper, username: string, password: string, maxRetries = 2): Promise<boolean> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`Login attempt ${attempt}/${maxRetries}...`);
      await scraper.login(username, password);
      
      if (await scraper.isLoggedIn()) {
        console.log('Login successful!');
        return true;
      }
    } catch (e: unknown) {
      const errorMessage = e instanceof Error ? e.message : String(e);
      console.error(`Login attempt ${attempt} failed:`, errorMessage);
      
      if (errorMessage.includes('AlternateIdentifier') || errorMessage.includes('verification')) {
        console.error('Twitter requires additional verification. Please use TWITTER_COOKIES instead.');
        throw new Error('Authentication error: Twitter requires additional verification. Please export and use TWITTER_COOKIES.');
      }
      
      if (attempt < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }
  }
  return false;
}

Deno.serve(async (req) => {
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

    const scraper = new Scraper();
    
    const twitterUsername = Deno.env.get('TWITTER_USERNAME');
    const twitterPassword = Deno.env.get('TWITTER_PASSWORD');
    const twitterCookies = Deno.env.get('TWITTER_COOKIES');

    let isAuthenticated = false;

    // Try cookies first (most reliable method)
    if (twitterCookies) {
      try {
        const cookies = JSON.parse(twitterCookies);
        await scraper.setCookies(cookies);
        isAuthenticated = await scraper.isLoggedIn();
        console.log(isAuthenticated ? 'Authenticated via cookies' : 'Cookies expired or invalid');
      } catch (e) {
        console.error('Error setting cookies:', e);
      }
    }

    // Fallback to username/password
    if (!isAuthenticated && twitterUsername && twitterPassword) {
      try {
        isAuthenticated = await loginWithRetry(scraper, twitterUsername, twitterPassword);
      } catch (e: unknown) {
        const errorMessage = e instanceof Error ? e.message : String(e);
        console.error('Authentication failed:', errorMessage);
        return new Response(
          JSON.stringify({ 
            error: errorMessage,
            fallback: true,
            hint: 'Twitter requires additional verification. You need to provide TWITTER_COOKIES instead of username/password.'
          }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    if (!isAuthenticated) {
      return new Response(
        JSON.stringify({ 
          error: 'Not authenticated to Twitter',
          fallback: true,
          hint: 'Please configure TWITTER_COOKIES secret with valid session cookies.'
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Fetch user profile
    let profileImageUrl: string | null = null;
    try {
      console.log(`Fetching profile for @${cleanUsername}`);
      const profile = await scraper.getProfile(cleanUsername);
      if (profile && profile.avatar) {
        profileImageUrl = profile.avatar;
        console.log(`Got profile image: ${profileImageUrl}`);
      }
    } catch (profileError) {
      console.error(`Error fetching profile for @${cleanUsername}:`, profileError);
    }

    // Search for ETHMumbai tweets
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
        profileImageUrl,
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
