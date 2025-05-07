
# API Usage Guide

This guide explains how the Open Media Search app communicates with the Openverse API to retrieve media content.

## API Endpoint

The Openverse API is accessed at:
```
https://api.openverse.org/v1/images?q={searchTerm}
```

## Making a Request

The backend receives a search term from the frontend and forwards a GET request to the Openverse API. Here’s an example of how this works:

### Frontend Call
```js
fetch('/api/search?q=sunset')
```

### Backend Handling
```js
app.get('/api/search', async (req, res) => {
    const searchQuery = req.query.q;
    const result = await axios.get(`https://api.openverse.org/v1/images?q=${searchQuery}`);
    res.json(result.data);
});
```

## API Parameters

- `q`: Keyword to search for (required)
- `license`: Filter by license (optional)
- `media_type`: Type of media (optional)

## Sample Response
```json
{
  "results": [
    {
      "title": "Beach Sunset",
      "url": "https://...",
      "thumbnail": "https://...",
      "license": "cc0"
    }
  ]
}
```

The backend then passes this data to the frontend, where it is rendered dynamically.
