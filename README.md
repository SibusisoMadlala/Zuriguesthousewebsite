
  # Modern Guest House Website

  This is a code bundle for Modern Guest House Website. The original project is available at https://www.figma.com/design/GJUEfenb9Qi81vIbolpgvk/Modern-Guest-House-Website.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.

  ## Supabase booking integration

  This app now uses the same Supabase project settings as `Zuri/Zuriguesthousewebsite`.

  Booking requests are submitted via the edge function endpoint:
  - `POST {VITE_SUPABASE_URL}/functions/v1/submit-booking`

  Required environment variables:
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`
  - `VITE_ADMIN_EMAIL` (optional in frontend, used in backend workflows)

  Make sure the target Supabase project has the expected edge functions and migrations from the original project deployed.

  ### Configure email sending (required for real emails)

  Booking emails are sent by Supabase edge functions (`submit-booking` -> `send-email`), not directly by the frontend.

  In your Supabase project, configure edge function secrets:
  - `SUPABASE_URL`
  - `SUPABASE_SERVICE_ROLE_KEY`
  - `ADMIN_EMAIL`
  - `RESEND_API_KEY`

  Also ensure your sender domain/email is verified in Resend for:
  - `Zuri Guest House <noreply@zuriguesthouse.com>`

  If `RESEND_API_KEY` is missing, the function logs simulated emails in `email_log` (status `simulated`) and no real email is delivered.
  