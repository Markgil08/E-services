# UI Integration Handoff & Aesthetic Documentation

## ⚠️ Prime Directive for Integrating AI
When merging this UI repository with the functional project, **the existing functional backend and core logic dictate the structure**. 
* Do not alter the underlying functional logic to fit the UI. 
* Instead, map the approved CSS classes, color variables, sound triggers, and visual components to the existing functional architecture. 
* If a structural conflict occurs, adapt the UI's HTML/JSX wrapping to respect the functional code's requirements while maintaining the visual aesthetic outlined below.

---

## 🎨 Approved Aesthetic Specifications
The visual and auditory identities in this project are finalized and approved. They must be preserved during integration.

* **Color Palette:** Minimalist White and Green scheme. 
  * Backgrounds and base containers prioritize clean, negative space (White).
  * Borders, primary actions, and typography accents utilize the designated Green tones for high contrast and readability.
* **Typography & Icons:** Clean, highly legible sans-serif typography paired with intuitive, minimalist iconography to ensure accessibility for all users at the kiosk.
* **Auditory Feedback:** UI interaction sounds (e.g., success chimes, error alerts, and button tap feedback) are approved and should be wired to the corresponding functional state changes.
* **Input Mechanism:** **[DEPRECATED]** The custom on-screen virtual keyboard has been entirely removed from this UI build. Rely on native OS/device keyboards for all text inputs. Ensure input fields trigger the native keyboard smoothly without layout breakage.

---

## 🧠 Component Thought Process & Business Logic Context
To aid in mapping the UI to the functional logic, here is the rationale behind specific UI flows and content displays:

### Document Selection Flow (`presentEntryChoice`)
When a user selects a document card, the UI presents a modal to choose the data entry method: **ID Scanning** or **Manual Entry**.
* **Intent:** To reduce friction. The UI is designed to push users toward the AI ID Scanning (PhilSys/PhilHealth) for faster, error-free processing, but must gracefully fallback to the Manual Entry form if the user prefers or lacks the ID.
* **Integration Note:** The UI provides the loading states and animations (e.g., the scanning laser overlay). Tie your functional OCR/Camera triggers directly to these UI states.

### Dynamic Pricing Display (e.g., Barangay Business Permit)
You will notice the price for the Barangay Business Permit is listed in the UI as **"₱200+"** rather than a flat fee.
* **Intent:** The pricing is dynamic and depends on the scale and nature of the business being registered. 
* **Integration Note:** The UI uses the "+" as a visual indicator of variable pricing. Ensure the final checkout/computation UI reflects the functional backend's calculated total based on the user's selected business scale.

### Form Modals & Layout Shifts
* **Intent:** To prevent the active input field from being hidden behind native device keyboards.
* **Integration Note:** Maintain the CSS offset logic (e.g., `.form-shift-up`) when focus events are triggered on input fields to ensure the user can always see what they are typing.

---

## 🚀 Integration Checklist for the Developer
- [ ] Strip out any remaining references to the old custom virtual keyboard scripts.
- [ ] Map the functional state variables (Loading, Success, Error) to the provided UI classes.
- [ ] Attach the approved audio feedback functions to the functional event listeners (e.g., `onSubmit`, `onClick`).
- [ ] Ensure the dynamic pricing logic correctly populates the final assessment screen while keeping the "200+" label on the initial selection card.