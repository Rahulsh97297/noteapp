const http = require('http');

const request = (method, path, bodyString = null) => {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 5000,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, data: JSON.parse(data || '{}') }));
    });

    req.on('error', reject);
    if (bodyString) req.write(bodyString);
    req.end();
  });
};

async function runTests() {
  console.log('--- STARTING TESTS ---');

  // Test 1: GET /notes (empty)
  let res = await request('GET', '/api/notes');
  console.log('GET /notes (initial):', res.status, res.data);

  // Test 2: POST /notes (success)
  res = await request('POST', '/api/notes', JSON.stringify({ title: 'First Note', content: 'Testing content' }));
  console.log('POST /notes (valid):', res.status, res.data);
  const noteId = res.data.id;

  // Test 3: POST /notes (missing title)
  res = await request('POST', '/api/notes', JSON.stringify({ content: 'No title here' }));
  console.log('POST /notes (missing title):', res.status, res.data);

  // Test 4: POST /notes (empty title)
  res = await request('POST', '/api/notes', JSON.stringify({ title: '', content: 'Empty title' }));
  console.log('POST /notes (empty title):', res.status, res.data);

  // Test 5: POST /notes (whitespace title)
  res = await request('POST', '/api/notes', JSON.stringify({ title: '   ', content: 'Whitespace title' }));
  console.log('POST /notes (whitespace title):', res.status, res.data);

  // Test 6: POST /notes (malformed JSON)
  res = await request('POST', '/api/notes', '{"title": "Missing bracket"');
  console.log('POST /notes (malformed JSON):', res.status, res.data);

  // Test 7: GET /notes (after adding)
  res = await request('GET', '/api/notes');
  console.log('GET /notes (after post):', res.status, res.data);

  // Test 8: DELETE /notes/:id (success)
  res = await request('DELETE', `/api/notes/${noteId}`);
  console.log(`DELETE /notes/${noteId} (valid):`, res.status, res.data);

  // Test 9: DELETE /notes/:id (non-existing id)
  res = await request('DELETE', '/api/notes/9999');
  console.log('DELETE /notes/9999 (not found):', res.status, res.data);

  // Test 10: DELETE /notes/:id (invalid format)
  res = await request('DELETE', '/api/notes/invalid_id');
  console.log('DELETE /notes/invalid_id (invalid format):', res.status, res.data);

  console.log('--- END OF TESTS ---');
}

runTests().catch(console.error);
