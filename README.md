# Smart Election Assistant

## 🌍 Vertical Chosen
Civic Tech & Education - Assisting First-Time Voters

## 💡 Approach and Logic
This project is designed to eliminate the friction first-time voters face by replacing intimidating government forms with an intuitive, conversational AI interface. The core logic relies on a state-machine architecture that dynamically alters the user journey based on context (e.g., Country, Age, Citizenship, Registration Status). 

## ⚙️ How the Solution Works
1. **Multi-Lingual Onboarding:** The user selects their preferred language (English, Spanish, Hindi, etc.) and country.
2. **Document OCR Simulation:** Users upload an ID. The system simulates OCR to extract their Date of Birth and validates if they meet the 18+ age requirement.
3. **Secure API Hand-off:** If the user is eligible but unregistered, the system generates a secure deep-link to official government portals to maintain data privacy.
4. **Voice Integration:** Users can interact with the assistant using their microphone via the native Web Speech API.
5. **Interactive Mapping:** Once verified, the app embeds a live Google Map showing the exact polling location based on their region.
6. **Gamification:** The timeline dashboard dynamically generates a "Voter Certificate" which can be shared via the native Web Share API.

## 🤖 Google Services Integration
- **Google Maps:** Embedded interactive iframes for Polling Station routing.
- *(Architecture Note: The `mockLlmService` state-machine is structurally isolated so it can be hot-swapped with the `@google/genai` SDK for production).*

## ⚠️ Assumptions Made
- The application assumes the user has access to a modern browser supporting the Web Speech API for voice interactions.
- User data (Name, DOB) is kept entirely client-side for privacy purposes during the MVP phase.
- Polling station data is mocked for the demonstration, assuming a future backend integration with the Google Civic Information API.
