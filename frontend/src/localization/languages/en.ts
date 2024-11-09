export const en = {
  translation: {
    buttons: {
      backButton: "Go Back",
      save: "Save",
      submit: "Submit",
      unSubmit: "Un-Submit",
      review: "Review",
      unReview: "Un-Review",
      delete: "Delete",
      close: "Close",
      add: "Add",
      edit: "Edit",
      create: "Create",
      reset: "Reset",
    },
    common: {
      new: "New",
      number: "Number",
      text: "Text",
      status: "Status",
      name: "Name",
      yes: "Yes",
      no: "No",
      total: "Total",
      title: "Title",
      note: "Note",
      paid: "Paid",
    },
    navMenu: {
      dashboard: "Dashboard",
      reservations: "Reservations",
      ledgers: "Ledgers",
    },
    profileMenu: {
      profile: "Profile",
      settings: "Settings",
      logout: "Logout",
    },
    login: {
      keyWord: "Login",
      password: "Password",
      email: "Email",
      link: "sign up now here.",
      now: "now!",
      signUpLoginToggle: "Already have an account?",
      toContinueUsing: "To continue using our platform, please",
      action: "log in.",
      hasAccount: "If you don't have an account,",
    },
    signUp: {
      keyWord: "Sign Up",
      password: "Password",
      confirmPassword: "Confirm Password",
      email: "Email",
      username: "Username",
      now: "now!",
      link: "log in now here.",
      toContinueUsing: "To continue using our platform, please",
      action: "sign up.",
      hasAccount: "If you already have an account,",
    },
    errorPage: {
      wrongPath: "404 Not found!",
      errorMessage: "Oops! Something went wrong.",
    },
    errorValidation: {
      usernameAtleastTwoCharacters: "Username should be atleast 2 characters",
      invalidEmail: "Should be a valid email",
      passwordAtleastSixCharacters: "Password should be atleast 6 characters",
      passwordShouldMatch: "Passwords doesn't match",
      required: "Required",
    },
    apiError: {
      unknownError: "Unknown error.",
      invalidCredentials: "Invalid credentials.",
      emailExists: "Email already exists.",
    },
    notifications: {
      allFieldsMandatory: "All fields are mandatory",
      fillBeforeSubmit:
        "Please fill in all the required fields before submitting.",
    },
    ledgersPage: {
      ledgers: "Ledgers",
      createNewLedger: "Create new Ledger",
      selectLedgerColor: "Pick a ledger color",
    },
    reservationsPage: {
      reservations: "Reservations",
      createNewReservation: "Create new Reservation",
      reservationStart: "Reservation Start",
      reservationEnd: "Reservation End",
    },
    dashboard: {
      reservedDates: "Reserved dates",
    },
    classColors: {
      default: "Default",
      primary: "Primary",
      secondary: "Secondary",
      accent: "Accent",
      success: "Success",
      warning: "Warning",
      info: "Info",
      error: "Error",
    },
  },
} as const;
