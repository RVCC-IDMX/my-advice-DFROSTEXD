# Final project — reflection

Write 2–3 sentences for each prompt. The reflection is where the learning gets named — give yourself room to think.

## 1. Pattern picked

Which pattern did you pick — A, B, or A+B? Why? If you considered one and rejected it, name what made it not the right fit for _your_ project.

I picked pattern A because my project takes free-text user input and needs to translate it into specific TMDB API parameters (genre IDs, year ranges, ratings). Pattern B wouldn't fit since I'm not generating natural language output, I'm fetching and displaying structured movie data from TMDB. 

## 2. The hardest part

What was the hardest part of integrating Groq into your Week 4 architecture? Was it the prompt design, the schema shape, the front-end refusal handling, the latency, the cost, the unfamiliar SDK, or something else?

The hardest part was fixing errors when typing the system prompt. Getting Groq to consistently return the exact JSON schema I needed — with the right genre IDs, year ranges, and refusal handling — took multiple iterations and careful testing. Small wording changes in the prompt could cause Groq to return different or malformed data, so I had to be very precise about what I asked for.

## 3. The moderation floor

How did the four-layer moderation floor (system prompt, JSON mode, delimited input, length cap) shape your design? Did any layer surprise you — either by how cheap it was to add, or by how much it changed the user-facing behavior?

The length cap (500 characters) surprised me by how cheap it was to add — just a simple if-statement before calling Groq. JSON mode (`response_format: { type: 'json_object' }`) was also surprisingly effective at preventing malformed responses. The delimited input (`<user_input>` tags) felt redundant at first, but it's a critical security layer that treats user text as data instead of instructions, preventing prompt injection attacks.

## 4. UX polish

What UX rough edge did you smooth, and why that one? What did smoothing it teach you about the difference between "shipping a working app" and "shipping a finished one"?

I added a refusal handling UI that shows a friendly message ("🤔 Hmm, I couldn't process that request") with helpful examples when Groq can't understand the input. Without it, the app would just show nothing or a generic error. This taught me that a working app handles the happy path, but a finished one handles edge cases gracefully and helps users recover from mistakes.

## 5. Groq's strengths and weaknesses

What did Groq do well in your project? What did it not do well — wrong outputs, drift from the schema, latency, hallucinations, anything else? How would your design change if you had to use a slower or less capable model?

Groq excels at understanding natural language variations and returning structured JSON quickly. The latency was fast enough that I didn't need a loading state specifically for Groq — only for the TMDB fetch.

## 6. What you would do differently

If you had another week, what would you do differently? Not "what new feature would you add" — what would you change about your _approach_ if you could start over?

I would test the Groq system prompt in isolation first, with a wider range of edge cases (gibberish input, non-movie requests, boundary cases), before connecting it to the TMDB API and building the UI. I spent time fixing prompt issues late in development when the whole pipeline was already built. Testing the translation layer thoroughly upfront would have saved time and prevented downstream bugs.

## 7. The optional ceiling (if attempted)

If you implemented either ceiling item (deterministic block-list, zeroth Groq call), what did you learn from it? If you did not, what would have to be true for it to be worth your time?

I did not implement the optional ceiling items. A block-list would be worth my time if users were actually abusing the system with inappropriate requests, and logs showed patterns worth blocking. A zeroth Groq call would make sense if Groq costs became significant or if the refusal rate was high enough that pre-filtering would save meaningful API calls. For a learning project with low traffic, the four-layer floor is sufficient.
