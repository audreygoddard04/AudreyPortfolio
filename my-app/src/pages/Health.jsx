import React, { useState } from 'react';
import './Health.css';
// import TDEECalculator from '../components/TDEECalculator'; // Deleted

function Health() {
  function scrollToHealthSection(id) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // FAQ copied in:
  const faqs = [
    { question: 'Light-headed?', answer: 'Could be low iron, dehydration, or low blood sugar.', more: 'Eat iron-rich foods like spinach or red meat, hydrate well, and pair iron with vitamin C (like oranges or peppers). If symptoms persist, consult a doctor.' },
    { question: 'Need more vitamin D?', answer: 'Take it with healthy fats to help absorption.', more: 'Good options: avocado, salmon, eggs. Bonus: take with magnesium for better uptake.' },
    { question: 'What’s a calorie deficit?', answer: 'You’re eating fewer calories than your body burns.', more: 'This forces your body to use stored fat for energy. A 250–500 calorie daily deficit is ideal for safe, sustainable fat loss.' },
    { question: 'What should my calorie deficit be?', answer: 'Subtract 10–20% from your Total Daily Energy Expenditure (TDEE).', more: 'Estimate TDEE (see TDEE Calculator), then reduce slightly. Avoid drastic deficits to protect muscle and energy.' },
    { question: 'What is Total Daily Energy Expenditure (TDEE) and how do I calculate it?', answer: 'It’s how many calories you burn per day.', more: 'Try the TDEE Calculator on the Health page! TDEE = BMR × Activity Factor.' },
    { question: 'How fast should I lose weight?', answer: 'Aim for 0.5–1 lb per week.', more: 'Faster = risk of muscle loss, fatigue, and rebound. Slow = sustainable.' },
    { question: 'How much protein should I eat?', answer: 'About 1g of protein per pound of body weight daily.', more: 'Protein helps you preserve muscle, stay full, and recover. Split it across all meals.' },
    { question: 'Can I lose fat and gain muscle at the same time?', answer: 'Yes, but slowly — especially if you\'re new to training.', more: 'Eat at a slight deficit with high protein, strength train 3–5x/week, and sleep well.' }
  ];
  const [openFAQ, setOpenFAQ] = useState(Array(faqs.length).fill(false));
  const toggleFAQ = idx => setOpenFAQ(open => open.map((v, i) => i === idx ? !v : v));

  return (
    <div className="health-bg">
      <header className="health-header">
        <h1>Health</h1>
        <nav className="health-nav">
          <ul>
            <li><a href="#fitness" onClick={e => { e.preventDefault(); scrollToHealthSection('fitness'); }}>Fitness</a></li>
            <li><a href="#nutrition" onClick={e => { e.preventDefault(); scrollToHealthSection('nutrition'); }}>Nutrition</a></li>
            <li><a href="#recipes" onClick={e => { e.preventDefault(); scrollToHealthSection('recipes'); }}>Recipes</a></li>
          </ul>
        </nav>
      </header>
      {/* <TDEECalculator />  -- deleted from JSX since component removed */}
      <section id="fitness" className="main-section">
        <h2>Fitness</h2>
        <div className="fitness-section">
          <h3>Non-negotiables</h3>
          <ul>
            <li>Consistency is key.</li>
            <li>10k steps per day.</li>
            <li>1 hour of movement per day.</li>
            <li>2 weight training sessions per week.</li>
            <li>Mix it up: Combine strength, cardio, and flexibility for balanced fitness.</li>
            <li>Track your progress: Keep a workout journal or download my app. @ComingSoon</li>
            <li>Rest and recovery: Allow time for your body to heal and grow stronger.</li>
            <li>Listen to your body: Adjust intensity and exercises as needed.</li>
          </ul>
        </div>
        <div className="fitness-section">
          <h3>Workouts</h3>
          <div className="workout-types">
            <div className="workout-category">
              <h4>Lifting</h4>
              <ul>
                <li><strong>Legs:</strong> Squats, Lunges, Romanian Deadlifts, Leg Press, Calf Raises</li>
                <li><strong>Arms:</strong> Bicep Curls, Tricep Dips, Hammer Curls, Tricep Pushdowns</li>
                <li><strong>Back:</strong> Pull-Ups, Bent Over Rows, Lat Pulldowns, Deadlifts</li>
                <li><strong>Chest:</strong> Bench Press, Push-Ups, Chest Flyes, Incline Dumbbell Press</li>
              </ul>
            </div>
            <div className="workout-category">
              <h4>Cardio</h4>
              <ul>
                <li>Stair Master</li>
                <li>Elliptical</li>
                <li>Treadmill</li>
                <li>Jump Rope</li>
                <li>Swimming</li>
                <li>Running (intervals or steady-state)</li>
                <li>Cycling</li>
                <li>Rowing</li>
                <li>HIIT Circuits</li>
              </ul>
            </div>
          </div>
        </div>
        <p>Share your fitness routines, tips, and inspiration here.</p>
      </section>
      <section id="nutrition" className="main-section">
        <h2>Nutrition</h2>
        <div className="nutrition-section">
          <h3>Nutrition Hacks</h3>
          <div className="nutrition-hacks-group">
            <h4>1. Craving Control</h4>
            <ul>
              <li>Craving salty? You might be dehydrated. Drink a big glass of water first.</li>
              <li>Craving sugar? Eat protein to stabilize blood sugar.</li>
              <li>Nighttime hunger? Test yourself with a healthy snack (like carrots + hummus). If you won’t eat it, you're not truly hungry.</li>
              <li>Boiled egg test: Ask yourself, “Would I eat a boiled egg right now?” If not, you're likely just bored or stressed.</li>
              <li>Avoid artificial sweeteners if they trigger more cravings or increase appetite for sweets.</li>
              <li>Brush your teeth after dinner to signal the end of eating for the day and reduce cravings.</li>
            </ul>
            <h4>2. Smart Eating Habits</h4>
            <ul>
              <li>Eat slowly and mindfully—it takes ~20 minutes for satiety hormones to work.</li>
              <li>Use smaller plates and bowls to naturally control portion size.</li>
              <li>Don't drink your calories—liquid calories don’t trigger fullness the same way as food.</li>
              <li>Say no at the store—avoiding junk at purchase is easier than resisting it daily at home.</li>
              <li>Keep tempting foods out of sight—out of sight = out of mind.</li>
              <li>Always plate your snacks—eating from the bag encourages overeating.</li>
            </ul>
            <h4>3. Macronutrient Strategies</h4>
            <ul>
              <li>Eat 1g of protein per lb of body weight per day (especially if training or active).</li>
              <li>Front-load protein early in the day to reduce cravings later.</li>
              <li>Pair carbs with protein or fat to blunt blood sugar spikes and keep you fuller longer.</li>
              <li>Limit refined sugars (sweets, white flour, soda) to stabilize mood and energy.</li>
              <li>Limit simple carbs—especially ultra-processed, low-fiber versions.</li>
              <li>Aim for fiber with every meal (veggies, legumes, fruit, whole grains)—it improves gut health and satiety.</li>
              <li>Prioritize whole foods over macros—calories matter, but quality matters more.</li>
            </ul>
            <h4>4. Meal Planning & Timing</h4>
            <ul>
              <li>Meal prep weekly to avoid decision fatigue and reduce reliance on takeout.</li>
              <li>Don’t skip meals—leads to blood sugar crashes and binge eating later.</li>
              <li>Eat within 60–90 minutes of waking up to jump-start metabolism and hormones.</li>
              <li>Try time-restricted eating (e.g. 8–12 hr eating window) if it fits your schedule.</li>
              <li>Prep high-protein snacks ahead of time (e.g., hard-boiled eggs, Greek yogurt, cottage cheese, trail mix).</li>
            </ul>
            <h4>5. Psychology & Behavior Hacks</h4>
            <ul>
              <li>Don’t moralize food—one indulgence doesn’t “ruin” your day. Get back on track at the next meal.</li>
              <li>Use “if/then” planning: If I crave sweets, then I’ll go for a walk or drink water.</li>
              <li>Associate healthy food with a reward (e.g., nice music, presentation, or enjoyable environment).</li>
              <li>Avoid all-or-nothing thinking—aim for consistency, not perfection.</li>
              <li>Change your identity first: Think “I’m a healthy person” rather than “I’m trying to be healthy.”</li>
            </ul>
            <h4>6. Gut & Digestion Tips</h4>
            <ul>
              <li>Chew your food thoroughly to aid digestion and prevent bloating.</li>
              <li>Eat fermented foods (yogurt, kimchi, sauerkraut) to support gut bacteria.</li>
              <li>Stay hydrated throughout the day—water supports digestion, nutrient transport, and hunger regulation.</li>
              <li>Avoid lying down after eating to prevent acid reflux and improve digestion.</li>
              <li>Start meals with greens or vinegar-based foods to help with glycemic control.</li>
            </ul>
            <h4>7. Sleep, Stress, and Hormonal Support</h4>
            <ul>
              <li>Sleep at least 7–8 hours—poor sleep increases ghrelin (hunger hormone) and cravings.</li>
              <li>Manage stress proactively—chronic stress elevates cortisol, which increases fat storage and sugar cravings.</li>
              <li>Caffeine curfew—cut off caffeine ~6–8 hours before bed to protect sleep quality.</li>
            </ul>
          </div>
        </div>
        
        <div className="nutrition-section">
          <h3>Fasting</h3>
          <div className="fasting-dropdowns">
            <details className="fasting-detail">
              <summary className="fasting-summary">Intermittent fasting</summary>
              <div className="fasting-content">
                <p><strong>Duration:</strong> 12-16 hours</p>
                <p><strong>Benefits:</strong> Helps you lose weight, decreases brain fog, increases energy</p>
              </div>
            </details>
            
            <details className="fasting-detail">
              <summary className="fasting-summary">Autophagy fasting</summary>
              <div className="fasting-content">
                <p><strong>Duration:</strong> 17-72 hours</p>
                <p><strong>Benefits:</strong> Helps detox, improve brain function and cognition, prevents colds, and balances sex hormones</p>
              </div>
            </details>
            
            <details className="fasting-detail">
              <summary className="fasting-summary">Gut-reset fasting</summary>
              <div className="fasting-content">
                <p><strong>Duration:</strong> 24+ hours</p>
                <p><strong>Benefits:</strong> Helps counteract antibiotic use, offsets birth control use, helps tackle small intestinal bacterial overgrowth (SIBO)</p>
              </div>
            </details>
            
            <details className="fasting-detail">
              <summary className="fasting-summary">Fat-burner fasting</summary>
              <div className="fasting-content">
                <p><strong>Duration:</strong> 36+ hours</p>
                <p><strong>Benefits:</strong> Helps minimize weight-loss resistance, releases stored sugar, reduces cholesterol</p>
              </div>
            </details>
            
            <details className="fasting-detail">
              <summary className="fasting-summary">Dopamine-reset fasting</summary>
              <div className="fasting-content">
                <p><strong>Duration:</strong> 48+ hours</p>
                <p><strong>Benefits:</strong> Helps reboot dopamine levels, and lower anxiety levels</p>
              </div>
            </details>
            
            <details className="fasting-detail">
              <summary className="fasting-summary">Immune-reset fasting</summary>
              <div className="fasting-content">
                <p><strong>Duration:</strong> 72+ hours</p>
                <p><strong>Benefits:</strong> Helps ease a chronic condition, prevent chronic disease, alleviate pain and stiffness of musculoskeletal injuries, and slow down the effects of aging</p>
              </div>
            </details>
          </div>
        </div>

        <div className="nutrition-section">
          <h3>Vitamins</h3>
          <div className="vitamins-grid">
            <div className="vitamin-card">
              <span className="vitamin-title">B1 (Thiamine)</span>
              <span className="vitamin-function">Important for carbohydrate metabolism</span>
              <span className="vitamin-note">Body doesn't store the vitamin • TPP</span>
              <span className="vitamin-sources">Sources: liver, spinach, green peas, navy and pinto beans, whole grain cereals, legumes</span>
            </div>
            
            <div className="vitamin-card">
              <span className="vitamin-title">B2 (Riboflavin)</span>
              <span className="vitamin-function">Essential for FMN and FAD (coenzymes essential for redox reactions)</span>
              <span className="vitamin-sources">Sources: soybeans, liver, milk, cheese, green leafy vegetables</span>
            </div>
            
            <div className="vitamin-card">
              <span className="vitamin-title">B3 (Niacin)</span>
              <span className="vitamin-function">Part of coenzyme essential to form NAD+ and NADP+</span>
              <span className="vitamin-note">Catalyze redox reactions • Body can synthesize (but isn't efficient)</span>
              <span className="vitamin-sources">Sources: meats, veggies, milk, cheese, and grains</span>
            </div>
            
            <div className="vitamin-card">
              <span className="vitamin-title">B6 (Pyridoxine)</span>
              <span className="vitamin-function">Coenzyme that interconverts A-keto acids into amino acids</span>
              <span className="vitamin-note">Too much leads to irreversible nerve damage (don't be monkey and eat only bananas)</span>
              <span className="vitamin-sources">Sources: avocado, chicken, fish, nuts, liver, bananas</span>
            </div>
            
            <div className="vitamin-card">
              <span className="vitamin-title">Biotin</span>
              <span className="vitamin-function">Carbon transporter in both lipid and carbohydrate metabolism</span>
              <span className="vitamin-note">Bacteria in intestinal tract synthesizes it</span>
            </div>
            
            <div className="vitamin-card">
              <span className="vitamin-title">Folic Acid</span>
              <span className="vitamin-function">Also produced by intentional tract</span>
              <span className="vitamin-sources">Sources: leafy greens, dried beans, and liver</span>
            </div>
            
            <div className="vitamin-card">
              <span className="vitamin-title">B12</span>
              <span className="vitamin-function">Must obtain by food</span>
              <span className="vitamin-sources">Sources: meat, eggs, milk, cereal</span>
            </div>
            
            <div className="vitamin-card">
              <span className="vitamin-title">Vitamin A</span>
              <span className="vitamin-function">Antioxidant • Important for vision and development of epithelial cells</span>
              <span className="vitamin-sources">Sources: carrots</span>
            </div>
            
            <div className="vitamin-card">
              <span className="vitamin-title">Vitamin C (Ascorbic Acid)</span>
              <span className="vitamin-function">Helps prevent oxidant damage • Helps keep iron in the 2+ state</span>
              <span className="vitamin-note">Helps convert proline to hydroxyproline in collagen (stabilizes it) • Citrus vitamin • Antioxidant</span>
            </div>
            
            <div className="vitamin-card">
              <span className="vitamin-title">Vitamin D (Sunshine)</span>
              <span className="vitamin-function">Helps body absorb calcium and phosphorus</span>
            </div>
            
            <div className="vitamin-card">
              <span className="vitamin-title">Vitamin E</span>
              <span className="vitamin-function">Antioxidant</span>
              <span className="vitamin-sources">Sources: vegetable oils, nuts, whole grains, leafy greens</span>
            </div>
            
            <div className="vitamin-card">
              <span className="vitamin-title">Vitamin K</span>
              <span className="vitamin-function">Helps blood clots</span>
              <span className="vitamin-sources">Sources: leafy greens, cauliflower, broccoli, organ meats, milk, soybeans, avocados, bananas</span>
            </div>
          </div>
        </div>

        <div className="nutrition-section">
          <h3>Antioxidants</h3>
          <ul className="nutrition-list">
            <li>Vitamin E, C, selenium, dark chocolate ({'>'}90%), pecans, blueberries, strawberries, raspberries, goji berries, kale</li>
          </ul>
        </div>

        <div className="nutrition-section">
          <div className="dietary-guidelines">
            <div className="guidelines-column">
              <h3>5 in</h3>
              <ul className="guidelines-list">
                <li>Omega 3 Fats: Increase omega-3 intake to a minimum of 2 grams per day</li>
                <li>Probiotics: Eat three or more servings of probiotic containing foods per day</li>
                <li>Micronutrients/Antioxidants: Increase antioxidants, micronutrients, and polyphenols through colorful plant diversity and spices</li>
                <li>Fiber: Eat over 50 grams of fiber per day</li>
                <li>Protein: Eat at least 30 grams of healthy whole food protein per meal</li>
              </ul>
            </div>
            <div className="guidelines-column">
              <h3>3 out</h3>
              <ul className="guidelines-list avoid">
                <li>Refined or "added" sugars of any kind</li>
                <li>Refined grains of any kind ("wheat flour," "oat flour," "white flour," "all-purpose flour," etc)</li>
                <li>Refined industrial vegetable or seed oils of any kind</li>
              </ul>
            </div>
          </div>
        </div>

        <section id="recipes" className="main-section">
          <h2>Recipes</h2>
          <p>Delicious and healthy recipes coming soon!</p>
        </section>
        <section className="main-section faq-main-section">
          <h2>FAQs</h2>
          <ul className="faq-list">
            {faqs.map((faq, idx) => (
              <li key={idx} className={`faq-item${openFAQ[idx] ? ' open' : ''}`}>
                <button className="faq-q" onClick={() => toggleFAQ(idx)} aria-expanded={openFAQ[idx]}>
                  <span className="faq-arrow">{openFAQ[idx] ? '▼' : '▶'}</span>
                  <span className="faq-question">{faq.question}</span>
                  <span className="faq-answer">{faq.answer}</span>
                </button>
                {openFAQ[idx] && (
                  <div className="faq-more">{faq.more}</div>
                )}
              </li>
            ))}
          </ul>
        </section>
      </section>
    </div>
  );
}

export default Health; 