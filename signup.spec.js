const { test, expect } = require('@playwright/test');
const { SignupPage } = require('./SignupPage');
const { personas } = require('./test-data/personas')


test.describe('BetterHelp Branching Funnels', () => {
  
  test('Individual Adult Path - Mental Health Focus', async ({page}) => {
    const user = personas.individualPath;
    const signup = new SignupPage(page);

    async signup.startQuestionnaireBasics(persona);
    
    // Sexual Orientation 
    await signup.waitForIdentityQuestion();
    await signup.selectSexualOrientation(persona.orientation);

    // Relationship Status
    await signup.waitForRelationshipQuestion();
    await signup.selectRelationship(persona.relationship);

    // Religious Importance
    await signup.waitForReligiousImportanceQuestion();
    await signup.selectRelationship(persona.religiousImportance);
    
  });


  for (const persona of personas) {
    // Uses the ID from persona Obect to make unique title
    test(`Signup Path: ${persona.id}`, async({ page }) => {
      const signup = new SignupPage(page);

      await signup.navigate();
      await expect(page).toHaveTitle(/BetterHelp - Get Started & Sign-Up Today/);

      // Step 1 - Therapy Type
      await signup.selectIndividualTherapy();

      // Step 2 - Select Country
      await signup.selectCountry('United States');
      await expect(signup.nextButton).toBeVisible();
      await signup.proceed();

      // Step 3 - Select Gender
      await signup.selectGender(persona.gender);
      // await signup.goToPreviousQuestion()

      // Step 4 - Age Selection
      // Added explicit visibility check for animated slide transitions on questionnaire to avoid flakiness
      await signup.waitForAgeQuestion();
      await signup.selectAge(persona.age);

      // Step 5 - Sexual Identity and Orientation
      await signup.waitForIdentityQuestion();
      await signup.selectSexualOrientation(persona.orientation);

      // Step 6 - Relationship Status
      await signup.waitForRelationshipQuestion();
      await signup.selectRelationship(persona.relationship);

      // await signup.goToPreviousQuestion();

      // await signup.waitForIdentityQuestion();
      // await signup.selectSexualOrientation('Gay');
      // await signup.goToPreviousQuestion();

      // await signup.waitForIdentityQuestion();
      // await signup.selectSexualOrientation('Lesbian');
      // await signup.goToPreviousQuestion();

      // await signup.waitForIdentityQuestion();
      // await signup.selectSexualOrientation('BiPan');
      // await signup.goToPreviousQuestion();

      // await signup.waitForIdentityQuestion();
      // await signup.selectMoreOptions();
      // await signup.selectSexualOrientation('PreferNotToSay');
      // await signup.goToPreviousQuestion();

      // await signup.waitForIdentityQuestion();
      // await signup.selectSexualOrientation('Questioning');
      // await signup.goToPreviousQuestion();

      // await signup.waitForIdentityQuestion();
      // await signup.selectSexualOrientation('Queer');
      // await signup.goToPreviousQuestion();

      // await signup.waitForIdentityQuestion();
      // await signup.selectSexualOrientation('Asexual');
      // await signup.goToPreviousQuestion();

      // await signup.waitForIdentityQuestion();
      // await signup.selectSexualOrientation('DoNotKnow');
      // await signup.goToPreviousQuestion();

      // await signup.waitForIdentityQuestion();
      // await signup.selectSexualOrientation('Other');


      await expect(page).toHaveURL(/.*get-started/);
    });
  }
});