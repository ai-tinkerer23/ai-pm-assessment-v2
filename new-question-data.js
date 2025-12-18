// NEW QUESTION DATA STRUCTURES
// Generated from v2 AI Assessment Question Bank
// Total: 46 questions, 100 points (Sections 1-6: 14 pts each, Section 7: 16 pts)

const questionData = {
    1: {
        1: { correct: 'B', explanation: 'RAG retrieves real-time data or domain-specific information from external sources (databases, documents, web) and feeds it to the LLM, which then generates a response based on both its training and the retrieved context. This reduces hallucinations and allows the model to answer with up-to-date or specialized information it wasn't trained on.', learning: 'RAG = retrieval of external data + LLM generation using that data.' },
        2: { correct: 'D', explanation: 'A larger context window allows the model to process more text at once—essential for tasks like analyzing long documents, maintaining conversation history, or code review. However, it increases computational cost and latency. For simple queries, a small context window suffices.', learning: 'Context window = how much text the model can "remember" in one interaction.' },
        3: { correct: 'D', explanation: 'Fine-tuning trains the model on domain-specific data to adapt its behavior (e.g., medical terminology, legal writing). Prompt engineering involves crafting effective prompts without retraining. RAG retrieves external information. Data labeling prepares training datasets. Each serves different purposes in AI workflows.', learning: 'Fine-tuning = retraining the model; prompt engineering = better instructions; RAG = external knowledge retrieval.' },
        4: { correct: 'A', explanation: 'Embeddings convert text into numerical vectors that capture semantic meaning, enabling similarity search. In RAG systems, user queries and stored documents are both embedded, then compared via vector similarity (e.g., cosine similarity) to retrieve the most relevant documents for the LLM to use in generating answers.', learning: 'Embeddings = numerical representations of text; used for semantic search in RAG.' },
        5: { correct: 'C', explanation: 'Chain-of-thought prompting encourages the model to show its reasoning steps, improving accuracy on complex problems. Self-consistency samples multiple reasoning paths and picks the most common answer. ReAct combines reasoning with external actions. These are all advanced prompting techniques, not training methods.', learning: 'Chain-of-thought = step-by-step reasoning in prompts.' },
        6: { correct: 'E', explanation: 'Agents can dynamically decide which tools to use, make multi-step plans, and iterate based on feedback—going far beyond simple API calls or prompt templates. They represent a higher level of autonomy in AI systems.', learning: 'AI agents = autonomous decision-making + tool use + multi-step reasoning.' },
        7: { correct: 'D', explanation: 'Reducing temperature makes outputs more deterministic and focused on high-probability tokens, suitable for factual tasks. Increasing temperature adds randomness, useful for creative tasks. Top-p (nucleus sampling) and top-k control token selection diversity. Understanding these helps PMs tune model behavior for different use cases.', learning: 'Temperature = randomness control; lower = more deterministic, higher = more creative.' }
    },
    2: {
        1: { correct: 'D', explanation: 'Strategic AI products solve real business problems, focus on user value, and are technically feasible. Chasing trends without clear ROI, avoiding AI where it doesn't fit, and prioritizing tech over UX all lead to failure. Successful AI PMs balance business, user, and technical considerations.', learning: 'AI strategy = business value + user needs + technical feasibility.' },
        2: { correct: 'B', explanation: 'Establish clear baselines and success metrics before implementing AI. Compare AI performance to existing solutions (human, rule-based) and measure impact on key business KPIs (accuracy, speed, cost, user satisfaction). This data-driven approach justifies AI investment and guides iteration.', learning: 'Measure AI impact = baseline metrics + comparison to alternatives + business KPIs.' },
        3: { correct: 'C', explanation: 'AI products improve with more user interactions and feedback. Start with an MVP, launch to real users, collect data, and iterate rapidly. This "build-measure-learn" loop is more effective than waiting for perfection, though you must ensure minimum quality and safety thresholds are met.', learning: 'AI products improve through iteration and real-world data, not perfection upfront.' },
        4: { correct: 'E', explanation: 'Bias, fairness, privacy, transparency, and accountability are all critical ethical considerations in AI product development. Ignoring any of these can lead to harm, legal issues, and reputational damage. Responsible AI PMs proactively address ethics throughout the product lifecycle.', learning: 'AI ethics = bias, fairness, privacy, transparency, accountability—all are critical.' },
        5: { correct: 'B', explanation: 'While in-house ML teams offer control, they require significant investment in hiring, infrastructure, and maintenance. For many companies, especially startups or those without core ML expertise, leveraging third-party APIs or managed services is faster, cheaper, and lower-risk—at least initially.', learning: 'Build vs. buy in AI = consider cost, speed, control, and core competency.' },
        6: { correct: 'D', explanation: 'Human-in-the-loop systems keep humans involved in critical decisions, especially where AI may fail or ethical stakes are high. This hybrid approach combines AI speed/scale with human judgment/accountability. Common in moderation, medical diagnosis, and high-stakes decision-making.', learning: 'Human-in-the-loop = AI assists, humans decide (especially for high-stakes tasks).' }
    },
    3: {
        1: { correct: 'C', explanation: 'Accuracy measures overall correctness. Precision measures how many positive predictions were actually positive (avoids false positives). Recall measures how many actual positives were correctly identified (avoids false negatives). F1-score balances precision and recall. Different metrics matter for different use cases (e.g., high recall for cancer detection, high precision for spam filtering).', learning: 'Precision = avoiding false positives; Recall = avoiding false negatives; F1 = balance.' },
        2: { correct: 'D', explanation: 'Overfitting occurs when a model memorizes training data but fails to generalize to new data. It's common in complex models with insufficient or unrepresentative training data. Solutions include: more diverse data, regularization techniques, simpler models, or cross-validation. Recognizing overfitting is critical for building robust AI products.', learning: 'Overfitting = model memorizes training data, fails on new data. Fix: more data, regularization, simpler model.' },
        3: { correct: 'C', explanation: 'API calls to GPT-4 or Claude are the fastest way to add LLM capabilities without managing infrastructure. You send a prompt, get a response. Fine-tuning adapts pre-trained models to your data. Embedding APIs convert text to vectors. API-first development is a core skill for modern AI PMs building LLM-powered products.', learning: 'LLM APIs (OpenAI, Anthropic, etc.) = fastest way to integrate generative AI into products.' },
        4: { correct: 'A', explanation: 'Prompt injection is when malicious users manipulate prompts to bypass instructions or extract sensitive information. Defense strategies: input validation, output filtering, sandboxing, and clear system/user message separation. This is a critical security concern for LLM-based products.', learning: 'Prompt injection = malicious prompt manipulation. Defend with validation, filtering, sandboxing.' },
        5: { correct: 'E', explanation: 'All are key evaluation considerations for LLMs. Accuracy measures correctness, latency affects UX, cost impacts scalability, safety prevents harmful outputs, and bias/fairness ensure equitable outcomes. Comprehensive evaluation requires assessing all dimensions, not just accuracy.', learning: 'Evaluate LLMs on: accuracy, speed, cost, safety, fairness—not just accuracy.' },
        6: { correct: 'D', explanation: 'Vector databases store embeddings and enable fast similarity search, essential for RAG, recommendation systems, and semantic search. Unlike traditional databases (rows/columns), they optimize for high-dimensional vector operations. Examples: Pinecone, Weaviate, Chroma. Understanding vector DBs is key for building modern AI products.', learning: 'Vector databases = store embeddings, enable fast similarity search (critical for RAG).' }
    },
    4: {
        1: { correct: 'B', explanation: 'GDPR, CCPA, and other privacy regulations require explicit user consent, data minimization, transparency, and user rights (access, deletion). AI products must be designed with privacy by default, not as an afterthought. PMs must work closely with legal and security teams to ensure compliance.', learning: 'Privacy regulations (GDPR, CCPA) require: consent, transparency, data minimization, user rights.' },
        2: { correct: 'E', explanation: 'All are critical. De-identification/anonymization protects individual privacy. Access controls prevent unauthorized use. Encryption secures data in transit and at rest. Retention policies limit exposure. Responsible data handling is a multi-layered approach, not a single technique.', learning: 'Secure AI data handling = anonymization + access controls + encryption + retention policies.' },
        3: { correct: 'C', explanation: 'Training data bias leads to biased model outputs (e.g., facial recognition failing on darker skin tones, hiring models favoring men). Mitigation strategies: diverse datasets, bias audits, fairness metrics, and ongoing monitoring. Bias is a systemic issue requiring proactive intervention at every stage.', learning: 'Training data bias → biased outputs. Mitigate with: diverse data, audits, fairness metrics, monitoring.' },
        4: { correct: 'B', explanation: 'Differential privacy adds mathematical noise to data or queries, allowing aggregate insights while protecting individual privacy. It's widely used in data analytics (e.g., Apple, US Census). PMs should understand this technique for privacy-preserving AI products, especially in sensitive domains (healthcare, finance).', learning: 'Differential privacy = mathematical privacy guarantee by adding noise to data/queries.' },
        5: { correct: 'D', explanation: 'Synthetic data mimics real data distributions without exposing actual user data, useful for training/testing while preserving privacy. However, it may not fully capture real-world complexity and can still encode biases. It's a valuable tool, not a complete solution. Use cases: healthcare research, fraud detection, testing.', learning: 'Synthetic data = privacy-preserving, but may lack real-world complexity and can still be biased.' },
        6: { correct: 'E', explanation: 'Model explainability, audit trails, human oversight, and regulatory compliance are all essential for trustworthy AI. Black-box models in high-stakes settings (healthcare, hiring, lending) pose ethical and legal risks. Explainable AI (XAI) techniques like SHAP, LIME help PMs build accountable systems.', learning: 'Trustworthy AI requires: explainability, audit trails, human oversight, regulatory compliance.' }
    },
    5: {
        1: { correct: 'B', explanation: 'AI product requirements must specify model performance expectations (accuracy, latency), failure modes (what happens when AI is wrong), human oversight mechanisms, and success metrics. Unlike traditional software, AI systems are probabilistic and require unique PM considerations around uncertainty, bias, and iteration.', learning: 'AI product requirements = performance expectations + failure modes + human oversight + success metrics.' },
        2: { correct: 'D', explanation: 'Data availability and quality are often the biggest bottlenecks in AI product development. Even with great ideas and engineering talent, insufficient or biased data can derail projects. PMs must assess data feasibility early and plan for data collection, labeling, and augmentation as needed.', learning: 'Data availability/quality is often the biggest AI bottleneck—assess early and plan accordingly.' },
        3: { correct: 'C', explanation: 'AI systems require continuous monitoring of model performance, data drift (input data changes over time), concept drift (relationships between inputs/outputs change), and adversarial attacks. Models can degrade post-launch due to shifting user behavior, new edge cases, or malicious inputs. PMs must plan for ongoing evaluation and retraining.', learning: 'Monitor AI systems for: performance degradation, data/concept drift, adversarial attacks. Plan for retraining.' },
        4: { correct: 'B', explanation: 'A/B testing compares AI vs. non-AI (or AI variant A vs. B) on real users, measuring impact on key metrics (engagement, revenue, satisfaction). This data-driven approach validates AI's value and informs iteration. Essential for product-led AI development.', learning: 'A/B testing AI = compare AI vs. baseline (or variant A vs. B) on real users, measure impact.' },
        5: { correct: 'E', explanation: 'All are critical collaboration points. Data scientists build models, engineers deploy them, designers shape UX, legal ensures compliance, and domain experts provide context. AI PMs orchestrate these cross-functional teams, translating between technical and business stakeholders.', learning: 'AI PMs collaborate with: data scientists, engineers, designers, legal, domain experts—orchestrating all.' },
        6: { correct: 'D', explanation: 'Graceful degradation means designing fallback mechanisms when AI fails (e.g., routing to human support, showing "I don't know," using rule-based backup). This improves user experience and trust. AI systems are probabilistic—plan for failure, don't assume perfection.', learning: 'Graceful degradation = fallback mechanisms when AI fails (human support, rules, "I don't know").' }
    },
    6: {
        1: { correct: 'A', explanation: 'ROI = (Gain - Cost) / Cost. For AI, gains include revenue increase, cost savings, and efficiency gains. Costs include development, infrastructure, maintenance, and ongoing monitoring. PMs must quantify both to justify AI investments and prioritize projects.', learning: 'AI ROI = (revenue + cost savings + efficiency gains - dev/infra/maintenance costs) / total costs.' },
        2: { correct: 'E', explanation: 'All are critical cost components. Compute (training/inference) can be significant, especially for large models. Data (collection, labeling, storage) is often underestimated. Talent (ML engineers, data scientists) is expensive and scarce. Infrastructure and ongoing monitoring add up. PMs must budget holistically.', learning: 'AI costs = compute + data + talent + infrastructure + monitoring. Budget for all, not just compute.' },
        3: { correct: 'C', explanation: 'AI products often improve with scale (more data, more users) but also face increasing compute and storage costs. Unit economics help PMs understand profitability at different scales and make informed pricing/investment decisions. Key question: Does value scale faster than cost?', learning: 'AI unit economics = revenue per user vs. cost per user. Does value scale faster than cost?' },
        4: { correct: 'B', explanation: 'Opportunity cost is the value of the next-best alternative. Investing in AI Project A means not investing in Project B (or hiring more engineers, etc.). PMs must consider trade-offs and prioritize projects with the highest expected value relative to alternatives.', learning: 'Opportunity cost = value of next-best alternative. Prioritize AI projects with highest relative value.' },
        5: { correct: 'D', explanation: 'Time to value measures how quickly users see benefits from AI, influencing adoption and ROI. Faster time to value (via MVPs, iterative launches, quick wins) accelerates feedback loops and revenue. Balance speed with quality/safety. Long development cycles risk market changes and wasted investment.', learning: 'Time to value = speed to user benefit. Faster → better feedback, adoption, ROI (balance with quality).' },
        6: { correct: 'E', explanation: 'All are common risks. Technical feasibility (can we build it?), adoption (will users use it?), performance (does it work well enough?), ethical/legal (is it safe and compliant?), and competitive dynamics (will we maintain advantage?) must all be evaluated. Risk mitigation is ongoing, not one-time.', learning: 'AI investment risks = technical, adoption, performance, ethical/legal, competitive. Evaluate and mitigate all.' }
    },
    7: {
        1: { correct: 'C', explanation: 'AI excels in healthcare for diagnosis (radiology, pathology), drug discovery (molecule generation, clinical trial optimization), personalized treatment (genomics), and operational efficiency (scheduling, admin). However, high regulatory barriers, data privacy concerns, and the need for clinical validation slow adoption. Understanding these trade-offs is critical.', learning: 'Healthcare AI = diagnosis, drug discovery, personalized treatment. Challenges: regulation, privacy, validation.' },
        2: { correct: 'E', explanation: 'All are major applications. Fraud detection (anomaly detection), personalization (recommendations, pricing), algorithmic trading (predictive models), risk assessment (credit scoring), and customer service (chatbots) are transforming finance. PMs must understand domain-specific regulations (e.g., fair lending laws) and risk management.', learning: 'Finance AI = fraud detection, personalization, trading, risk assessment, customer service. Must comply with regulations.' },
        3: { correct: 'C', explanation: 'Retail AI personalizes shopping (recommendations, dynamic pricing), optimizes inventory (demand forecasting), automates customer service (chatbots), and enhances in-store experiences (computer vision for checkout). These applications improve margins and customer satisfaction. PMs must balance personalization with privacy.', learning: 'Retail AI = personalization, inventory optimization, customer service, in-store automation.' },
        4: { correct: 'D', explanation: 'Manufacturing AI optimizes production (predictive maintenance, quality control), supply chain (demand forecasting, logistics), and robotics (automation, safety). These applications reduce costs and improve efficiency. PMs must understand operational constraints and safety requirements.', learning: 'Manufacturing AI = predictive maintenance, quality control, supply chain optimization, robotics.' },
        5: { correct: 'A', explanation: 'Not all problems require AI. Simple rules, heuristics, or traditional software often suffice and are more explainable, cheaper, and easier to maintain. Use AI when: problems are too complex for rules, data is abundant, and AI provides clear value over alternatives. Avoid "AI for AI's sake."', learning: 'Use AI when: complex patterns, abundant data, clear value over simpler alternatives. Avoid "AI for AI's sake."' },
        6: { correct: 'E', explanation: 'AI is transforming education through personalized learning (adaptive content), automated grading (essay scoring, feedback), intelligent tutoring (1-on-1 assistance), and accessibility (speech-to-text, translation). However, concerns about bias, privacy, and over-reliance on automation require careful design. PMs must prioritize equitable access and learning outcomes.', learning: 'Education AI = personalized learning, automated grading, tutoring, accessibility. Balance with equity and privacy.' },
        7: { correct: 'B', explanation: 'In regulated industries (healthcare, finance, government), explainability, auditability, and compliance are critical. Black-box models may perform well but face adoption barriers if stakeholders can't understand or trust decisions. PMs must prioritize interpretability and work closely with legal/compliance teams.', learning: 'Regulated industries need explainable AI for trust, compliance, and auditability—not just performance.' },
        8: { correct: 'C', explanation: 'AI in hiring can reduce bias (blind resume screening), improve efficiency (candidate matching), and predict job fit. However, it can also perpetuate bias if trained on biased data, lacks transparency, and raises fairness concerns. Legal and ethical risks are high. PMs must ensure fairness audits, human oversight, and compliance with anti-discrimination laws.', learning: 'AI in hiring = efficiency + bias risks. Ensure fairness audits, transparency, human oversight, legal compliance.' },
        9: { correct: 'A', explanation: 'AI legal/compliance is highly domain-specific. Healthcare has HIPAA, finance has fair lending laws, EU has GDPR/AI Act, government has procurement rules. Generic compliance doesn't exist. PMs must work with legal experts in their specific industry and geography to navigate regulations.', learning: 'AI compliance is domain-specific (healthcare, finance, EU, etc.). Work with legal experts for your industry.' }
    }
};

const allQuestions = {
    1: {
        1: "What is Retrieval-Augmented Generation (RAG) and why is it useful?",
        2: "You're building an AI assistant that analyzes contracts. The model keeps \"forgetting\" earlier parts of long documents. What's the likely issue?",
        3: "What's the difference between fine-tuning a model and prompt engineering?",
        4: "You're building a customer support chatbot that needs to answer questions using your company's knowledge base. What role do embeddings play in this system?",
        5: "What is \"chain-of-thought\" prompting and when is it useful?",
        6: "What distinguishes AI agents from simple API calls or prompt templates?",
        7: "You're testing a generative AI model and notice outputs are repetitive and predictable. What parameter should you adjust?"
    },
    2: {
        1: "What is the most important factor when deciding whether to build an AI product feature?",
        2: "How should you measure the success of an AI product?",
        3: "What is the biggest mistake AI product managers make when launching new features?",
        4: "What is the most critical ethical consideration when building AI products?",
        5: "Your CEO wants to build an in-house ML team instead of using third-party APIs. What's the most important trade-off to consider?",
        6: "What does \"human-in-the-loop\" mean in AI systems?"
    },
    3: {
        1: "What's the difference between precision and recall in model evaluation?",
        2: "You've trained a model that performs perfectly on training data but poorly on real-world data. What's the problem?",
        3: "You want to add GPT-4 or Claude to your product. What's the fastest way to get started?",
        4: "What is \"prompt injection\" and why should AI PMs care?",
        5: "What metrics should you track when evaluating an LLM for production use?",
        6: "What is a vector database and why is it important for AI products?"
    },
    4: {
        1: "What is the most important privacy regulation AI PMs should be aware of?",
        2: "How should you handle sensitive user data in AI systems?",
        3: "What is the primary cause of bias in AI models?",
        4: "What is differential privacy?",
        5: "Your team wants to use synthetic data to train an AI model for a healthcare application. What's the main benefit and limitation?",
        6: "What is the most important principle for building trustworthy AI systems?"
    },
    5: {
        1: "What should be included in an AI product requirements document (PRD)?",
        2: "What is the biggest bottleneck in AI product development?",
        3: "What should you monitor after launching an AI product?",
        4: "How should you validate that an AI feature is better than a non-AI alternative?",
        5: "Who should AI PMs collaborate with most closely?",
        6: "What is \"graceful degradation\" in AI systems?"
    },
    6: {
        1: "How do you calculate ROI for an AI project?",
        2: "What is the most overlooked cost in AI projects?",
        3: "What is the most important economic principle for AI products?",
        4: "What is \"opportunity cost\" in AI product prioritization?",
        5: "What is the most important factor in determining AI product success?",
        6: "What is the biggest risk when investing in AI products?"
    },
    7: {
        1: "How is AI being used in healthcare?",
        2: "What are the most common AI applications in finance?",
        3: "How is AI transforming retail?",
        4: "What is the most common AI use case in manufacturing?",
        5: "When should you NOT use AI?",
        6: "How is AI being used in education?",
        7: "What is the most important consideration when deploying AI in regulated industries?",
        8: "What is the biggest challenge when using AI for hiring?",
        9: "What is the most important legal consideration for AI products?"
    }
};

const sectionData = {
    1: { name: 'AI Fundamentals & Mental Models', max: 14, questions: [1, 2, 3, 4, 5, 6, 7], points: [1, 2, 3, 2, 3, 1, 2] },
    2: { name: 'AI Strategy & Decision-Making', max: 14, questions: [1, 2, 3, 4, 5, 6], points: [3, 2, 2, 3, 1, 3] },
    3: { name: 'Hands-On AI Building & Experimentation', max: 14, questions: [1, 2, 3, 4, 5, 6], points: [2, 3, 2, 1, 3, 3] },
    4: { name: 'Data, Privacy & Security', max: 14, questions: [1, 2, 3, 4, 5, 6], points: [1, 3, 2, 2, 3, 3] },
    5: { name: 'Product Development & Execution', max: 14, questions: [1, 2, 3, 4, 5, 6], points: [1, 3, 2, 2, 3, 3] },
    6: { name: 'Economics, ROI & Prioritization', max: 14, questions: [1, 2, 3, 4, 5, 6], points: [1, 3, 2, 2, 3, 3] },
    7: { name: 'AI Use Cases Across Industries', max: 16, questions: [1, 2, 3, 4, 5, 6, 7, 8, 9], points: [2, 3, 2, 3, 1, 3, 2, 2, 1] }
};

// Verification: Total points
let totalPoints = 0;
for (let section in sectionData) {
    totalPoints += sectionData[section].max;
}
console.log('Total points:', totalPoints); // Should be 100

// Section-by-section verification:
for (let section in sectionData) {
    const data = sectionData[section];
    const sum = data.points.reduce((a, b) => a + b, 0);
    console.log(`Section ${section} (${data.name}): ${sum}/${data.max} points, ${data.questions.length} questions`);
    if (sum !== data.max) console.error(`ERROR: Section ${section} points don't match!`);
}
