# Email Modal Component

This is a reusable Vue.js component featuring a modal form that allows users to send emails to selected recipients.

## 🔧 Features

- Modal with subject & message input fields
- Autocomplete field to select multiple recipients
- Validation for required fields and at least one recipient
- Toast notification on successful submission
- Responsive layout with clean UI

## 🧰 Built With

- [Vue 3](https://vuejs.org/)
- Composition API
- Teleport for modal rendering
- Transitions & Slots
- Native form validation

## ✅ Notes
- Recipient suggestions are fetched via simulated API
- You can trigger the modal by clicking on "Contact" in the navbar
- The Toast disappears automatically after 4 seconds

## 📦 How to Run

```bash
# 1. Clone the repository
git clone https://github.com/your-username/email-modal-component.git

# 2. Navigate into the project directory
cd email-modal-component

# 3. Install dependencies
npm install

# 4. Run the dev server
npm run serve