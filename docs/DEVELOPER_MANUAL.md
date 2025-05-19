````markdown
# Developer Manual

## Installation

1. **Clone the repository**  
   ```bash
   git clone https://github.com/mukenye/terpbale.git
   cd terpable/server
````

2. **Install server dependencies**

   ```bash
   npm install
   ```
3. **Configure environment variables**
   Create a file named `.env` in the `server/` directory with:

   ```
   SUPABASE_URL=https://zveqfsepdzbtsginedqz.supabase.co
   SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp2ZXFmc2VwZHpidHNnaW5lZHF6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NzUxNDY4NywiZXhwIjoyMDYzMDkwNjg3fQ.pKouwGNNL80D2prxprkQIALn5rM4OGnALxXZ14l6XmE
   ```
4. **Start the back end**

   ```bash
   node index.js
   ```

## Static Front-End

All static files live in `client/public/`. To preview locally, you can use a simple static server:

```bash
# from project root
cd client/public
npx serve .
```

Or, once deployed, your front end will be served automatically by Vercel (or your chosen host).

## API Specification

### GET `/api/health`

* **Returns**:

  ```json
  { "status": "OK" }
  ```

### GET `/api/events`

* **Description**: Retrieves all events sorted by start time.
* **Response**: Array of event objects:

  ```json
  [
    {
      "id": 1,
      "title": "Test Event",
      "start_time": "2025-05-20T14:00:00.000Z",
      "description": null,
      "location": null
    }
  ]
  ```

### POST `/api/rsvp`

* **Description**: Creates a new RSVP record.
* **Request Body**:

  ```json
  {
    "event_id": 1,
    "user_id": "demo-user"
  }
  ```
* **Response**: The created RSVP record:

  ```json
  {
    "id": 1,
    "event_id": 1,
    "user_id": "demo-user",
    "created_at": "2025-05-18T19:43:11.009Z"
  }
  ```

## Running Tests

*No automated tests are included in this version.*
To add tests later, you could integrate a testing framework (e.g., Jest) and run:

```bash
npm test
```

## Known Bugs & Roadmap

* **Known Bugs**

  * RSVP alert is basic and may not handle errors gracefully.
  * No validation on user inputs for the RSVP form.

* **Roadmap**

  1. Add user authentication with Supabase Auth.
  2. Enhance UI with a JavaScript framework (e.g., React).
  3. Implement event filtering by category and date range.
  4. Deploy API as serverless functions on Vercel.
  5. Write end-to-end tests and CI pipeline.

```
```
