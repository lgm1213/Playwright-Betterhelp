const { expect } = require('@playwright/test')

class SignupPage {
  constructor(page) {
    this.page = page;

    // Selectors
    // Navigation & Buttons
    this.getStartedButton = page.getByTestId('get-started-nav');
    this.nextButton = page.getByTestId('next-button');
    this.previousQuestionButton = page.getByTestId('back-button');

    // Therapy Type
    this.individualTitle = page.locator('label', { hasText: 'Individual'});

    // Country Selection
    this.countryTrigger = page.getByRole('combobox');

    // Gender Selections
    this.genderPrompt = page.getByText(/what is your gender identity\?/i);
    //this.genderPrompt = page.locator('#bamboo-node-prompt-GenderIdentity');

    // Age Selections
    this.agePrompt = page.getByText(/how old are you\?/i);
    this.ageTrigger = page.locator('#mui-component-select-question-Age');
    

    // Identity/Orientation Selections
    this.identifyPrompt = page.getByText(/how do you identify\?/i);


    this.menuContainer = page.getByRole('listbox');

    // Relationship Status Selection
    this.relationshipStatusPrompt = page.getByText(/what is your relationship status\?/i);

    // Religious Questions Selections
    this.religousImportancePrompt = page.getByText(/how important is religion in your life\?/i);

    // this.womanLabel = page.locator('label[for="question-GenderIdentity-Woman"]');
    // this.manLabel = page.locator('label[for="question-GenderIdentity-Man"]');
    
    // this.moreOptions = page.getByTestId('questionnaire-show-more-button').first();
    // this.otherInputField = page.getByRole('textbox');
    
  }

  

  // POM Actions
  async startQuestionnaireBasics(persona) {
    await this.selectIndividualTherapy();
    await this.selectCountry('United States');
    await this.proceed();

    await this.selectGender(persona.gender);
    await this.waitForAgeQuestion();
    await this.selectAge(persona.age);
  }

  async navigate() {
    await this.page.goto('https://www.betterhelp.com/')
    await this.getStartedButton.click()
  }

  async selectIndividualTherapy() {
    await this.individualTitle.click();
  }r

  async selectCountry(name) {
    // Click the trigger and wait for the menu to render
    await this.countryTrigger.click();
    await this.menuContainer.waitFor({ state: 'visible'});

    // Finds the specific option within the menu
    const option = this.menuContainer.getByRole('option', { name, exact: true});
    await option.scrollIntoViewIfNeeded();
    await option.click();
  }

  async selectGender(gender) {                                                                                                                                                                             
    const label = this.page.locator(`label[for="question-GenderIdentity-${gender}"]`);                                                                                                                                     
    await label.scrollIntoViewIfNeeded();                                                                                                                                                                                  
    await label.click();
  }

  async waitForAgeQuestion(){
    await this.agePrompt.waitFor({ state: 'visible', timeout: 10000 });
    await expect(this.agePrompt).toBeVisible();
  }

  async selectAge(age) {

    await this.ageTrigger.waitFor({ state: 'visible'});
    await this.ageTrigger.click();


    await this.menuContainer.waitFor({ state: 'visible' });

    const option = this.menuContainer.getByRole('option', { name: age.toString(), exact: true });

    await option.scrollIntoViewIfNeeded();
    await option.click();
  }

  async waitForIdentityQuestion(){
    await expect(this.identifyPrompt).toBeVisible({ timeout: 10000});
    await expect(this.identifyPrompt).toHaveText("How do you identify?");
  }

  async selectSexualOrientation(identity) {
    // const selector = `label[for="question-Identify-${identity}"]`;
    // const sexualIdentity = this.page.locator(selector);

    // await sexualIdentity.waitFor({ state: 'visible'});
    // await sexualIdentity.click({ force: true });

    const label = this.page.locator(`label[for="question-Identify-${identity}"]`);                                                                                                                                        
    await label.scrollIntoViewIfNeeded();                                                                                                                                                                                 
    await label.click();
  }

  async waitForRelationshipQuestion(){
    await expect(this.relationshipStatusPrompt).toBeVisible({ timeout: 10000});
    await expect(this.relationshipStatusPrompt).toHaveText('What is your relationship status?')
  }
  async selectRelationship(status) {
    const selector = `label[for="question-RelationshipStatus-${status}"]`;
    const relationshipStatus = this.page.locator(selector);

    await relationshipStatus.waitFor({ state: 'visible'});
    await relationshipStatus.click({ force: true});
  }

  async waitForReligiousImportanceQuestion() {
    await expect(this.religousImportancePrompt).toBeVisible({ timeout: 10000 });
    await expect(this.religousImportancePrompt).toHaveText("How important is religion in your life?");
  }

  async selectReligiousImportance(importance) {
    const selector = `label[ffor="question-HowImportantIsReligion-${importance}"]`;
    const religiousImportance = this.page.locator(selector);

    await expect(this.religiousImportance).click();

  }






  async fillInputField(labelText, value) {
    const input = this.page.getByTestId('question-other-text')

  }

  async goToPreviousQuestion() {
    await this.previousQuestionButton.waitFor({ state: 'visible' });
    await this.previousQuestionButton.click({ force: true });
  }

  async selectMoreOptions() {
    await this.moreOptions.waitFor({ state: 'visible'});
    await this.moreOptions.click();
  }

  async proceed() {
    await this.nextButton.click();
  }
}

module.exports = { SignupPage };