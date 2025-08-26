const fetch = require('node-fetch');

let cache = {
  stats: null,
  lastFetch: 0,
};

const CACHE_DURATION = 3600000; // 1 hour in milliseconds

exports.handler = async function(event, context) {
  const now = Date.now();

  if (cache.stats && (now - cache.lastFetch < CACHE_DURATION)) {
    return {
      statusCode: 200,
      body: JSON.stringify(cache.stats),
    };
  }

  const apiKey = process.env.REACT_APP_YOUTUBE_API_KEY;
  const channelId = 'UC-2-QoM2s-gQ9T5-t_V_w5A'; // HBMTB Channel ID

  if (!apiKey || apiKey === 'your_api_key_here') {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "YouTube API key is not configured." }),
    };
  }

  const url = `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.error) {
      return {
        statusCode: data.error.code,
        body: JSON.stringify({ error: data.error.message }),
      };
    }

    if (data.items && data.items.length > 0) {
      const statistics = data.items[0].statistics;
      const subscriberCount = parseInt(statistics.subscriberCount);
      const viewCount = parseInt(statistics.viewCount);

      const formatNumber = (num) => {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M+';
        if (num >= 1000) return (num / 1000).toFixed(0) + 'K+';
        return num.toString();
      };

      const newStats = [
        { value: formatNumber(subscriberCount), label: "Subscribers" },
        { value: formatNumber(viewCount), label: "Views" },
        { value: "1000+", label: "Trails Ridden" },
        { value: "7", label: "Years Riding" }
      ];
      
      cache = {
        stats: newStats,
        lastFetch: now,
      };

      return {
        statusCode: 200,
        body: JSON.stringify(newStats),
      };
    } else {
        return {
            statusCode: 404,
            body: JSON.stringify({ error: "Channel not found" }),
        };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch YouTube stats." }),
    };
  }
};
