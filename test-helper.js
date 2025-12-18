/**
 * AI Assessment Test Helper Script
 *
 * USAGE:
 * 1. Open index.html in your browser
 * 2. Open browser console (F12 > Console tab)
 * 3. Copy and paste this entire script
 * 4. Run commands as needed
 *
 * COMMANDS:
 * - autoFillSection(sectionNum) - Auto-fill and submit a specific section
 * - autoFillAllSections() - Auto-fill all 7 sections sequentially
 * - selectCorrectAnswers() - Select all correct answers for current section
 * - selectRandomAnswers() - Select random answers for current section
 * - quickTest() - Navigate to section 1, fill, submit (quick smoke test)
 */

// Select correct answers for all questions in the current visible section
function selectCorrectAnswers() {
    const activeSection = document.querySelector('.section.active');
    if (!activeSection) {
        console.log('❌ No active section found. Click "Choose a Section" first.');
        return;
    }

    const sectionId = activeSection.id;
    const sectionNum = parseInt(sectionId.replace('section', ''));

    console.log(`✅ Selecting CORRECT answers for Section ${sectionNum}...`);

    const questions = sectionData[sectionNum].questions;
    let selected = 0;

    questions.forEach(qNum => {
        const correctAnswer = questionData[qNum].correct;
        const inputs = document.querySelectorAll(`input[name="q${qNum}"]`);

        inputs.forEach(input => {
            const label = input.parentElement.querySelector('label').textContent.trim();
            const optionLetter = label.substring(0, 1);

            if (optionLetter === correctAnswer && parseInt(input.value) > 0) {
                input.checked = true;
                selected++;
            }
        });
    });

    console.log(`✅ Selected ${selected} correct answers`);
}

// Select random answers for all questions in the current visible section
function selectRandomAnswers() {
    const activeSection = document.querySelector('.section.active');
    if (!activeSection) {
        console.log('❌ No active section found. Click "Choose a Section" first.');
        return;
    }

    const sectionId = activeSection.id;
    const sectionNum = parseInt(sectionId.replace('section', ''));

    console.log(`🎲 Selecting RANDOM answers for Section ${sectionNum}...`);

    const questions = sectionData[sectionNum].questions;
    let selected = 0;

    questions.forEach(qNum => {
        const inputs = document.querySelectorAll(`input[name="q${qNum}"]`);
        const randomIndex = Math.floor(Math.random() * inputs.length);
        inputs[randomIndex].checked = true;
        selected++;
    });

    console.log(`✅ Selected ${selected} random answers`);
}

// Auto-fill and submit a specific section
async function autoFillSection(sectionNum, useCorrectAnswers = true) {
    console.log(`\n🚀 Auto-filling Section ${sectionNum}...`);

    // Navigate to section
    navigateToSection(sectionNum);
    await sleep(500);

    // Fill answers
    if (useCorrectAnswers) {
        selectCorrectAnswers();
    } else {
        selectRandomAnswers();
    }
    await sleep(500);

    // Submit
    console.log(`📤 Submitting Section ${sectionNum}...`);
    submitSection(sectionNum);
    await sleep(1000);

    console.log(`✅ Section ${sectionNum} complete!\n`);
}

// Auto-fill all 7 sections sequentially
async function autoFillAllSections(useCorrectAnswers = true) {
    console.log('\n🎯 AUTO-FILLING ALL SECTIONS...\n');
    console.log('This will take ~15 seconds...\n');

    for (let i = 1; i <= 7; i++) {
        await autoFillSection(i, useCorrectAnswers);
        await sleep(1000);
    }

    console.log('\n✅ ALL SECTIONS COMPLETE!');
    console.log('📊 Click "Choose a Section" to see the final summary');
    console.log('📧 Click "Email My Results" to test the email modal\n');
}

// Quick smoke test - fills section 1 only
async function quickTest() {
    console.log('\n⚡ QUICK TEST - Section 1 Only\n');

    // Click "Choose a Section" button
    showSectionMenu();
    await sleep(500);

    // Fill and submit section 1
    await autoFillSection(1, true);

    console.log('✅ Quick test complete!');
    console.log('💡 Run autoFillAllSections() to complete all sections\n');
}

// Test email modal without completing sections
function testEmailModal() {
    console.log('\n📧 Testing Email Modal...');

    // Add fake section scores if none exist
    if (completedSections.length === 0) {
        console.log('⚠️  No sections completed. Adding test scores...');
        sectionScores = { 1: 12, 2: 10, 3: 11, 4: 10, 5: 12, 6: 10, 7: 14 };
        completedSections = [1, 2, 3, 4, 5, 6, 7];
    }

    showEmailResultsModal();
    console.log('✅ Email modal opened!');
    console.log('💡 Test form submission with a real email to verify webhook\n');
}

// Helper function to sleep/wait
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Display available commands
function showTestCommands() {
    console.log('\n📋 AVAILABLE TEST COMMANDS:\n');
    console.log('1. quickTest() - Fast test of Section 1 only');
    console.log('2. autoFillSection(1) - Fill & submit section 1');
    console.log('3. autoFillAllSections() - Fill & submit all 7 sections');
    console.log('4. selectCorrectAnswers() - Select correct answers for current section');
    console.log('5. selectRandomAnswers() - Select random answers for current section');
    console.log('6. testEmailModal() - Open email results modal\n');
    console.log('💡 TIP: Run quickTest() for a fast smoke test\n');
}

// Auto-run on load
console.log('\n🎉 TEST HELPER LOADED!\n');
showTestCommands();
