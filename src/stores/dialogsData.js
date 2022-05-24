var defaultStory = {	story : ["One core word. <br>Ready to <b>harvest energy</b>.", "Two core words. <br>Ready to <b>harvest energy</b>.", "Three core words. <br>Ready to <b'>harvest energy</b>."],
  button: "LET'S<br>GO"};

var replayStory = {	story : ["You can do it. Let’s try this level again!"],
  button: "PLAY<br>AGAIN"};

let defaultLevelDataNormal = {
  story: [
    { speech: 'Ready to harvest energy.' }
  ],
  button: 'Continue',

  story_win: ["This is the kind of <b>energy</b><br>it takes to travel<br>to <b>distant stars!</b>"],
  button_win: 'Next<br>level',
  banner_win: 'Awesome',
  subbanner_win: 'You did it!',

  story_fail: ["I'm so sad. <nobr>We <b>Lost.</b></nobr> <br>Let's try <nobr>level <b class='levelnumber'>[level_number]</b></nobr> again."],
  button_fail: 'Replay',
  banner_fail: 'FAILURE',
}

let defaultLevelDataTutorial = {
  story: [
    { speech: 'You are learning the ropes!' }
  ], // TODO: it's only for testing

  story_win: ["You are learning the ropes!"],
  button_win: 'Next<br>level',
  banner_win: 'YOU GOT IT',

  story_fail: ["You can do it!<br>Practice makes perfect."],
  button_fail: 'Replay',
  banner_fail: 'TRY AGAIN',
}

let defaultLevelDataBonus = {
  story_win: ["Friend, this is <b>awesome</b>.", "You are the best. What did I win?"],
  button_win: 'Give<br>gift',
  banner_win: 'WHALE WISDOM',
  subbanner_win: 'GIFT EARNED',

  story_chapterEnd: ["I think we’re good in this sector.", "It’s going to take a lot of <b>hard work</b> to get things back to normal.", "Keep your chin up. We’re <b>counting</b> on you."],
  button_chapterEnd: 'Next<br>level',

  story_gameEnd: [["0R", "I think we’re good in this sector."], ["0R", "It’s going to take a lot of <b>hard work</b> to get things back to normal."], ["0R", "Keep your chin up. We’re <b>counting</b> on you."]],
  button_gameEnd: 'Game<br>end',

  story_fail: ["Alas, you didn’t fill the energy in time.", "Feel free to try again. :)"],
  button_fail: 'Replay',
  banner_fail: 'No gift',

  story_gift: ["Just what I always wanted."],
  button_gift: 'Continue',
  banner_gift: 'YOU GOT IT',
  subbanner_gift: 'Gift earned',
}





let levelData = [];

levelData[1] = {
  story: [
    //"<h1>HELP</h1>We need help! Our letters are <b>disappearing.</b> Words are too hard to match now! Can <b>you</b> do it?",
    //"<h1>HARVEST</h1>Create <b>matches</b> to collect energy.<br>Letters may be <b>missing</b>, so think carefully!",
    "<h1>LET’S MATCH</h1>We need help! Our letters are <b>disappearing.</b><br>Create <b>matches</b> to collect energy.",
    // then defined in the level xml...
    //
    //  This is your <h1>energy gauge.</h1><br:19>Matches gain. Mismatches lose.
    //  This is a core word.
    //  <h1>Fling </h1>it into matching words.
    //
    //  then, on first match...
    //
    //  Matched “<b>@targetName</b>”! Now, trying matching <b>one more</b> fruit.
    //
    //  then, on second match...
    //
    //  Get a <h1>hint </h1>any time.<br:15><alt1></alt1>Tap at the top left.    (Continue)
    //
  ],

  Xstory_A: [
    "[A] <h1>LET’S MATCH</h1>We need help! Our letters are <b>disappearing.</b><br>Create <b>matches</b> to collect energy.",
  ],

  Xstory_B: [
    "[B] <h1>LET’S MATCH</h1>We need help! Our letters are <b>disappearing.</b><br>Create <b>matches</b> to collect energy.",
  ],

  Xstory_C: [
    "[C] <h1>LET’S MATCH</h1>We need help! Our letters are <b>disappearing.</b><br>Create <b>matches</b> to collect energy.",
  ],

  story_win: [
    //"<b>Thank goodness</b>, it can still be done! Can you do more?",
    "<b>Thank goodness!</b> You matched the words! Can you do more?",
  ],

  Xstory_win_A: [
    "[A] <b>Thank goodness!</b> You matched the words! Can you do more?",
  ],

  Xstory_win_B: [
    "[B] <b>Thank goodness!</b> You matched the words! Can you do more?",
  ],

  Xstory_win_C: [
    "[C] <b>Thank goodness!</b> You matched the words! Can you do more?",
  ],

  button: 'START<br>CHAPTER<br>1',
};

levelData[2] = {
  story: [
    //"<h1>PRECISION</h1>Aim wisely. <br>Things start to get more <b>tricky.</b>",
    { title: 'LEVEL 2', speech: 'Meet <b>bumpers.</b><br>Matches start to get more tricky.' },
    { title: 'RELAX...', speech: 'Please take your time. <br>Usually, there’s <b>no rush.</b>' },
    // then defined in the level xml...
    //
    // <h1>Bumpers </h1>are a benign bother. <br:33>Fill up the energy meter to win.  --  with an animation of bumpers
    //
    // Then, after the first set is completed:
    //
    // <b>Three hits</b> make a<h1> wormhole</h1><br:15><alt1></alt1> and will<b> discard </b>your core word, and <b>absorb</b> orbiting words.</b>  -- with an animation of the wormhole
    //
  ],

  story_win: [
    { speech: 'Great. There will be many more <b>bumpers</b> in the future.' },
  ],
};


levelData[3] = {
  story: [
    // "<h1>TRIVIA</h1>Some matches are <b>facts.</b> <br> Let’s try some…",
    { title: 'LEVEL 3', speech: 'This time, there are <b>two</b> core words.' },
  ],

  story_win: [
    { speech: 'Do you think you’re getting the hang of it?' },
    { speech: 'You’ll see both <b>word</b> and <b>trivia</b> matches in the future.' }
  ],
};

levelData[4] = {
  story: [
    { speech: 'You’re doing <b>great</b>! I thought making matches would be <b>impossible</b> now.' },
    { speech: 'We need the <b>energy</b> created from matches, so this is a huge relief.' },
    { speech: 'Even so, there are so many <b>unanswered questions</b>.' },
    { speech: 'Why did the letters start <b>disappearing</b>?' },
    { speech: 'Will it get even <b>worse</b>? <br>How do we fix it for good?' }
  ],
  story_win: [
    //"We have a long way to go, but we’re off to a great start!",
    { speech: 'I’ve got it! We should bring our questions to the Great Space Whale!' },
  ],
};


levelData[5] = {
  banner_story: "CANDY LEVEL",
  story: [
    ["lR", "Oh <b>Great Space Whale</b>, please answer our question!"],
    ["Lr", "Those with questions must first <b>prove themselves worthy</b> by collecting candy."],
    //["Lr", "Those with questions must first <b>prove themselves worthy</b> of the answers."],
    //["Lr", "Take up my challenge. In <b>fifty seconds</b>, collect as much candy as you are able."],
    //["Lr", "Those who succeed will be granted <b>special gifts</b>, as well."],
    ["Lr", "Those who succeed will be granted <b>special gifts</b>, as well."],
    //["lR", "Gifts? How <b>exciting</b>! Can you do it?"],
    //["lR", "Matches will spawn candy, but don’t make mistakes. <br><b>Get ready!</b>"],
  ],
  story_fail: [
    ["Lr", "A <b>disappointing</b> performance. You have not yet proven yourself worthy of my gifts."],
    ["lR", "We’ll have to <b>try again</b> to get the answers we need!"],
  ],
  story_win: [
    ["lR", "We got the candy!"],
    ["Lr", "Your performance has pleased me. This <b>gift</b> is now yours to take."],

  ],
  story_gift: [
    ["lR", "All right! Now I’m ready for the <b>catwalk</b>!"],
    ["lR", "Okay <b>Great Space Whale</b>, please tell us: why have letters started <b>disappearing</b> across Alphazoid Prime?"],
    ["Lr", "The words you rely on now are the legacy of the <b>Lexiborgs</b>."],
    ["lR", "The Lexiborgs were around a <b>long, long time ago</b>. We don’t know much about them."],
    ["Lr", "What happens now is also a machination of the Lexiborgs. The <b>past</b> has caught up to the <b>present</b>."],
    ["lR", "What does that mean? How do we fix it?"],
    ["Lr", "Your question has been answered. Further questions? Find me again."],
  ],
};

levelData[6] = {
  story: [
    "<h1>YOU’RE A STAR</h1> Show me what you’ve got.",
    //      Then next, defined in the level, is...
    //  a dialog with a bonus star illustration, and the message...
    //      "Earn up to three bonus stars per level <br> with special moves and accomplishments.",
  ],
  story_win: [
    "You’re getting pretty good at this!",
  ],
};

levelData[7] = {
  story_before_characters: ["astra", "tyto"],
  story_before: [
    ["Lr", "So, you’ve found someone who can <b>help</b> us?"],
    ["lR", "Yes!"],
    ["Lr", "And you are <b>confident</b> they’re up to the task?"],
    ["lR", "It might be too early to be sure. But I <b>believe</b> in them!"],
    ["Lr", "Then I, too, shall place my faith in the <b>hero</b> you’ve chosen."],
    ["Lr", "May they bring this story to a <b>satisfying</b> conclusion."],
  ],

  story: [
    "I am Jaleen, a junk collector for the Steelios Robotics Company.",
  ],
  story_win: [
    "Thank you for your hard work.",
  ],
  button: 'START<br>CHAPTER<br>2',
};


levelData[8] = {
  story_win: [
    { speech: 'Nice job. You got a lot more <b>energy</b> for us.' },
  ],
};

levelData[9] = {
  story_win: [
    "Energy collected. Those bumpers are from the Lexiborgs, too.",
  ],
};

levelData[10] = {
  story: [
    "<h1>TAP ME</h1>Remember, you can tap me on the face anytime for the <b>bonus star</b> status.",
  ],
  story_win: [
    "Who knew the bumpers could come in patterns like that?",
  ],
};

levelData[11] = {
  story_win: [
    "Sweet. Ready for another Great Space Whale challenge?",
  ],
};

levelData[12] = {
  banner_story: "CANDY LEVEL",
  story: [
    ["Lr", "Take up my <b>challenge</b>. <br>In <b>fifty seconds</b>, collect as much candy as you are able."],
    ["lR", "Remember, if you win, we get a <b>present</b> and a <b>clue</b>!"],
  ],
  story_fail: [
    ["Lr", "A <b>disappointing</b> performance. You have not yet proven yourself worthy of my gifts."],
    ["lR", "We’ll have to <b>try again</b> to get the answers we need!"],
  ],
  story_win: [
    ["lR", "<b>Candy</b> acquired!"],
    ["Lr", "Your performance has pleased me. This <b>gift</b> is now yours to take."],
  ],
  story_gift: [
    ["lR", "Ooh! I love a <b>thrilling</b> read!"],
    ["lR", "Now tell us, how do we fix the <b>vanishing letters</b> across Alphazoid Prime?"],
    ["Lr", "In order to fix the words, you must continue <b>matching</b> them."],
    ["Lr", "Harvest their energy, and put that energy into this <b>Deactivator</b>."],
    ["lR", "What is a <b>Deactivator</b>? Some sort of Lexiborg device?"],
    ["Lr", "Yes. Once it is full of energy, it will send a <b>signal</b> across all of Alphazoid Prime."],
    ["Lr", "The letters will listen, and <b>obey</b>."],
  ],
  story_chapterEnd: [
    "My friend, you need to keep <b>harvesting energy</b>. You can do this!",
    "Alphazoid Prime needs those words, not just for energy, but for the <b>vast knowledge</b> they convey.",
    "You should talk to Jaleen. She knows tech, so maybe she can help!",
  ],
};

levelData[13] = {
  story_win: [
    "Good work there!",
  ],
};


levelData[14] = {
  story_win: [
    "Another step forward!",
  ],
};

levelData[15] = {
  story: [
    "I was so relieved to hear about the <b>Deactivator</b>.",
    "Still, it might be hard to harvest the energy for it with all those <b>bumpers</b> in the way.",
    "Bumpers have been around forever. They were <b>harmless</b> until recently, so we left them alone.",
    "Now they <b>bounce us back</b> if we get close! I wish we knew why...",
    "Sounds like a question for the <b>Great Space Whale</b>!",
  ],
  story_win: [
    "We are well on our way to restoring the galaxy.",
  ],
};

levelData[16] = {
  story: [
    "<h1>OPPOSITES</h1>Sometimes you have to <b>think differently.</b>",
    //
    // then defined in level xml:
    //
    // <h1>Spikes!</h1>
    //  The spikes mean you <b>match opposites</b>.
    //
  ],
  story_win: [
    "Whew, the <b>opposites</b> turned my circuits inside out.",
  ],
};

levelData[17] = {
  story: [
    "Let’s try <b>opposites</b> again...",
  ],
  story_win: [
    "Those scrambled words can be tricky, but you’re doing great!",
  ],
};

levelData[18] = {
  banner_story: "CANDY LEVEL",
  story: [
    ["Lr", "Take up my <b>challenge</b>. In <b>fifty seconds</b>, collect as much candy as you are able."],
    ["lR", "Pull this off and we get to ask our question!"],
    ["lR", "That <b>special gift</b> is bound to be pretty nice, too."],
  ],
  story_fail: [
    ["Lr", "A <b>disappointing</b> performance. You have not yet proven yourself worthy of my gifts."],
    ["lR", "We need to know more about those bumpers. You’ll just have to <b>try again</b>."],
  ],
  story_win: [
    ["Lr", "Your performance has pleased me. This <b>gift</b> is now yours to take."],
  ],
  story_gift: [
    ["lR", "Wow! I feel like a <b>new bot</b>!"],
    ["lR", "Time for my question. Great Space Whale, why do the <b>bumpers</b> stand in our way now?"],
    ["lR", "They were just <b>junk</b> until letters started disappearing."],
    ["Lr", "They are serving their function as designed by the Lexiborgs: to <b>guard</b> the words from <b>outside danger</b>."],
    ["lR", "But we’re not dangerous! Can we tell them that somehow?"],
    ["Lr", "Your question has been answered. Further questions? Find me again."],
  ],
};

levelData[19] = {
  story_win: [
    "Let’s keep pushing onward.",
  ],
};

levelData[20] = {
  story_win: [
    "I know your efforts will be rewarded.",
  ],
};

levelData[21] = {
  story: [
    "The Lexiborgs left a lot of stuff behind when they <b>disappeared</b>.",
    "Some of it’s really useful, but some of it is <b>junk and scrap</b> and nothing more.",
    "We used to think the bumpers were just junk, though.",
    "I wonder what other <b>secrets</b> the Lexiborgs left behind?",
  ],
  story_win: [
    "Our future is looking brighter now.",
  ],
};

levelData[22] = {
  story_win: [
    "We’re almost to the Great Space Whale. Keep it up!",
  ],
};

levelData[23] = {
  story_win: [
    "Never let the bumpers stand in your way!",
  ],
  banner_win: 'YOU GOT IT',
  subbanner_win: 'GOOD JOB!',
};

levelData[24] = {
  banner_story: "CANDY LEVEL",
  story: [
    ["Lr", "Take up my <b>challenge</b>. In <b>fifty seconds</b>, collect as much candy as you are able."],
    ["lR", "If the reward of knowledge isn’t enticing enough, remember that we get a <b>cool gift</b>, too!"],

  ],
  story_fail: [
    ["Lr", "A <b>disappointing</b> performance. You have not yet proven yourself worthy of my gifts."],
    ["lR", "We need to know more about those bumpers. You’ll just have to <b>try again</b>."],
  ],
  story_win: [
    ["Lr", "Your performance has pleased me. This <b>gift</b> is now yours to take."],
  ],
  story_gift: [
    ["lR", "Ahh, <b>flowers and ferrum</b>! It’s a perfect match!"],
    ["lR", "Great Space Whale, how can we stop the bumpers from <b>obstructing</b> our word harvest?"],
    ["Lr", "Words and bumpers will both obey the <b>Deactivator</b>."],
    ["lR", "There’s nothing to do but harvest more energy, then!"],
  ],
  story_chapterEnd: [
    "Well, that’s one mystery solved.",
    "If you keep working at it, I know you can <b>uncover</b> even more of this mystery.",
    "I appreciate your diligence, and so does everyone in Alphazoid Prime.",
  ],
};

// this is chapter #3
levelData[25] = {
  story_before_characters: ["Jaleen", "tyto"],
  story_before: [
    ["Lr", "What’s up with the <b>Great Space Whale</b>, anyway? It just knows everything?"],
    ["lR", "There are no records on when it first appeared or where it came from."],
    ["lR", "It may be even <b>older</b> than the Lexiborgs!"],
    ["Lr", "It’s sure <b>spry</b> in its old age! It really gets around!"],
  ],

  story: [
    "I am Barabell, the princess of Florax.",
    "I believe my expertise will be of great use to you.",
    //
    // in level xml:
    //
    // <h1>Sparklin’ stardust!</h1><br:26>@sidekick says, here’s a power to set matching words a-glitter.
    //
  ],
  story_win: [
    "Our energy stock continues to grow, thanks to you.",
  ],
  button: 'START<br>CHAPTER<br>3',
};

levelData[26] = {
  story_win: [
    "Ah, the sparkly <b>delight</b> of a good energy harvest.",
  ],
};

levelData[27] = {
  story: [
    "You may have heard, but I’m quite attuned to that which soars through our galaxy. <b>Comets</b> are my primary area of study.",
    "It seems letters began to disappear after <b>something unknown</b> sailed through here at a comet-like speed.",
    "I thought I would be able to <b>track</b> this object down myself, but…",
    "We may need the guidance of the <b>Great Space Whale</b>.",
  ],
  story_win: [
    "Commendable. Be sure to utilize my stardust.",
  ],

};

levelData[28] = {
  story_win: [
    "Excellent harvesting, my friend. We’ll put that <b>energy</b> to good use.",
  ],
};

levelData[29] = {
  story_win: [
    "The stars are smiling on you.",
  ],
};

levelData[30] = {
  banner_story: "CANDY LEVEL",
  story: [
    ["Lr", "Take up my <b>challenge</b>. In <b>fifty seconds</b>, collect as much candy as you are able."],
    ["lR", "This task should pose no difficulty for us. Are you ready?"],
  ],
  story_fail: [
    ["Lr", "A <b>disappointing</b> performance. You have not yet proven yourself worthy of my gifts."],
    ["lR", "This simply will not do. <b>Another attempt</b> is necessary."],
  ],
  story_win: [
    ["Lr", "Your performance has pleased me. This <b>gift</b> is now yours to take."],
  ],
  story_gift: [
    ["lR", "Butterflies are such <b>noble</b> creatures. I am honored to be adorned so."],
    ["lR", "Great Space Whale… Some sort of <b>celestial object</b> entered Alphazoid Prime recently."],
    ["lR", "This object could have something to do with why our letters have begun to <b>disappear</b>."],
    ["lR", "Finding it is paramount, so please tell me: why have I been unable to find it?"],
    ["Lr", "Your <b>assumptions</b> blind you to the truth. You must rethink what you think you know."],
    ["lR", "My assumptions? I suppose I assumed that the object is a comet or something else <b>natural</b> to space."],
    ["lR", "Could the truth be that it is, in fact, <b>artificial</b>? I will search again with this in mind."],
  ],
};

levelData[31] = {
  story_win: [
    "The future looks bright.",
  ],
};

levelData[32] = {
  story_win: [
    "You dodged those bumpers with grace.",
  ],
};

levelData[33] = {
  story: [
    "With the advice of the Space Whale, I was able to track down our <b>mystery object</b>.",
    "It is indeed <b>artificial</b>. Something sent here from another space-faring society, I assume.",
    "Its purpose, however, remains <b>mysterious</b>. I have more questions than ever.",
  ],
  story_win: [
    "Exquisite display.",
  ],
};

levelData[34] = {
  story_win: [
    "You shine as bright as any star.",
  ],
};

levelData[35] = {
  story_win: [
    "I am proud to witness your achievements.",
  ],
};

levelData[36] = {
  banner_story: "CANDY LEVEL",
  story: [
    ["Lr", "Take up my <b>challenge</b>. In <b>fifty seconds</b>, collect as much candy as you are able."],
    ["lR", "I look forward to seeing our reward."],
  ],
  story_fail: [
    ["Lr", "A <b>disappointing</b> performance. You have not yet proven yourself worthy of my gifts."],
    ["lR", "This simply will not do. <b>Another attempt</b> is necessary."],
  ],
  story_win: [
    ["Lr", "Your performance has pleased me. This <b>gift</b> is now yours to take."],
  ],
  story_gift: [
    ["lR", "When I wear this, I feel the <b>strength</b> of warriors past. Thank you."],
    ["lR", "Great Space Whale, please tell us, what <b>purpose</b> does this strange object sent to our galaxy serve?"],
    ["Lr", "All it wants is to send <b>a message home</b>."],
    ["lR", "…that’s all you are willing to tell us? What is the message? Where is home?"],
    ["Lr", "Your question has been answered. Further questions? Find me again."],
  ],
  story_chapterEnd: [
    "This Space Whale is like a <b>genie</b>, isn’t it?",
    "We must phrase our questions so <b>carefully</b> to receive anything of use in return.",
    "Nonetheless, our next steps are clear.",
    "We must determine <b>who</b> sent this object, this probe, and <b>why</b>.",
    "And you must continue to harvest energy for the Deactivator, before our words <b>disappear for good</b>.",
  ],
};

// this is chapter #4

levelData[37] = {
  story_before_characters: ["Barabell", "Astra"],
  story_before: [
    ["Lr", "I have made an observation: more and more letters are <b>disappearing</b> as time goes on."],
    ["Lr", "If we do not pick up the pace, we may lose our words <b>forever</b>."],
    ["lR", "I share your concerns. However, a <b>rushed</b> ending is rarely a <b>satisfying</b> one."],
    ["lR", "We must act with <b>precision</b> and <b>care</b>."],
    ["Lr", "You know best, as always, Astra."],
    ["Lr", "Even so, I cannot help but <b>fear</b> for the future of Alphazoid Prime."],
  ],

  story: [
    "Nice to meet you. I’m Murka!",
    "My specialty is baked goods. Cookies, cupcakes, you name it!",
    //
    //  defined in level xml:
    //
    // <h1>Mines!</h1><br:26>@sidekick says, Uh-oh, mines have appeared! Hitting them costs you 2 energy
    //
  ],
  story_win: [
    "You survived the mines, thank goodness!",
  ],
  button: 'START<br>CHAPTER<br>4',
};

levelData[38] = {
  story_win: [
    "Delicious win!",
  ],
};

levelData[39] = {
  story: [
    "Vanishing letters were worrisome enough.",
    "Now there are <b>mines</b> in the way, too. So scary!",
    "This situation raises a lot of <b>questions</b>.",
    "That <b>Space Whale</b> may be the one to ask…",
  ],
  story_win: [
    "Awesome! Good thing you’re here!",
  ],
};

levelData[40] = {
  story_win: [
    "This is just a taste of what’s to come.",
  ],
};

levelData[41] = {
  story_win: [
    "Mines may look tasty, but they’ll give you a real tummy ache!",
  ],
};

levelData[42] = {
  banner_story: "CANDY LEVEL",
  story: [
    ["Lr", "Take up my <b>challenge</b>. In <b>fifty seconds</b>, collect as much candy as you are able."],
    ["lR", "I’m excited about the <b>special gift</b> most of all. Let’s do this!"],
  ],
  story_fail: [
    ["Lr", "A <b>disappointing</b> performance. You have not yet proven yourself worthy of my gifts."],
    ["lR", "Don’t get too bitter. We can always <b>try again</b>."],
  ],
  story_win: [
    ["Lr", "Your performance has pleased me. This <b>gift</b> is now yours to take."],

  ],
  story_gift: [
    ["lR", "Ooh, it’s been a while since I changed my look! I feel so <b>stylish</b>!"],
    ["lR", "Okay, Space Whale, I have a question for you."],
    ["lR", "<b>Chocolate chip</b> or <b>butterscotch</b>?"],
    ["Lr", "This is your question?"],
    ["lR", "Mmhmm!"],
    ["Lr", "Very well. <b>Butterscotch</b>."],
    ["lR", "Ooh, good choice!"],
  ],
};

levelData[43] = {
  story: [
    "Sorry if you were expecting me to ask the Space Whale something <b>different</b> before.",
    "I wanted to do something to keep everyone’s <b>morale</b> up during this difficult time.",
    "I don’t have any particular skills besides <b>baking</b>.",
    "That’s why I decided to make an extra special batch of <b>cookies</b>!",
    "You do your thing, and I’ll keep doing mine, okay?",
  ],
  story_win: [
    "Like taking candy from a baby!",
  ],

};

levelData[44] = {
  story_win: [
    "Yeah, get that energy!",
  ],
};

levelData[45] = {
  story: [
    "Urgh, my <b>cookies</b> just don’t taste right!",
    "I don’t get it! What did I do wrong?",
    "Maybe the <b>Great Space Whale</b> will know.",
  ],
  story_win: [
    "Easy as blastberry pie!",
  ],

};

levelData[46] = {
  story_win: [
    "Sweet! You did it!",
  ],
};

levelData[47] = {
  story_win: [
    "You’re devouring these challenges!",
  ],
};

levelData[48] = {
  banner_story: "CANDY LEVEL",
  story: [
    ["Lr", "Take up my <b>challenge</b>. In <b>fifty seconds</b>, collect as much candy as you are able."],
    ["lR", "It would mean a lot to me if you could succeed here. Good luck!"],
  ],
  story_fail: [
    ["Lr", "A <b>disappointing</b> performance. You have not yet proven yourself worthy of my gifts."],
    ["lR", "Don’t get too bitter. We can always <b>try again</b>."],
  ],
  story_win: [
    ["Lr", "Your performance has pleased me. This <b>gift</b> is now yours to take."],
  ],
  story_gift: [
    ["lR", "I love <b>silly costumes</b>! Thanks, this cheers me up a little."],
    ["lR", "But I still want to know. Space Whale, why didn’t my <b>cookies</b> turn out?"],
    ["Lr", "A <b>vital component</b> has been altered."],
    ["lR", "That can’t be. It’s the same recipe as always!"],
    ["Lr", "But <b>you</b> are not the same."],
    ["lR", "I’m not the same? I guess I’ve been pretty <b>stressed</b> lately."],
    ["lR", "Could my <b>mood</b> have seeped into my <b>cookies</b>? I have a lot to think about."],
  ],
  story_chapterEnd: [
    "I honestly didn’t think all this was <b>affecting</b> me that much.",
    "I guess it’s tough being in a crisis, and not just in the obvious ways.",
    "Keep your chin up, okay?",
    "We’ll get through this, and I’ll have <b>cookies</b> waiting for you when we do!",
  ],
};

// this is chapter #5
levelData[49] = {
  story_before_characters: ["Gillim", "Barabell"],
  story_before: [
    ["Lr", "<span class='text-robot'>Beep beep beep-beep boop.</span>"],
    ["Lr", "<span class='text-robot'>Beep-beep boop beep.</span>"],
    ["Lr", "<span class='text-robot'>Boop beep boop-beep boop!</span>"],
    ["lR", "What was that? It seems your <b>translation capacitor</b> was off."],
    ["Lr", "<span class='text-robot'>Beep boop…</span><br> <span class='text-label'>Translation:</span> Never mind…"],
  ],

  story: [
    "I am a Galacton. Designation: Hemdar.",
    "My utilities include decryption and code breaking.",
    // defined in level XML:
    //
    // <h1>Tile transition!</h1><br:26>@sidekick says, here are powers that reshuffle the words.
    //
  ],
  story_win: [
    "With my aid, success is probable.",
  ],

  button: 'START<br>CHAPTER<br>5',
};

levelData[50] = {
  story_win: [
    "As predicted.",
  ],
};

levelData[51] = {
  story: [
    "Your arrival is timely.",
    "I have received data from the previously unidentified foreign object, now confirmed to be a <b>probe</b>.",
    "It seems the probe has been sending some kind of <b>message</b> or <b>signal</b>.",
    "However, said message is <b>heavily encoded</b> via a method I have not seen before.",
    "I may require the advice of the <b>Great Space Whale</b> in this endeavor.",
  ],
  story_win: [
    "Good. Please continue to harvest energy.",
  ],

};

levelData[52] = {
  story_win: [
    "Do not allow bumpers to slow you down.",
  ],
};

levelData[53] = {
  story_win: [
    "Excellent. More energy for the Deactivator.",
  ],
};

levelData[54] = {
  banner_story: "CANDY LEVEL",
  story: [
    ["Lr", "Take up my <b>challenge</b>. In <b>fifty seconds</b>, collect as much candy as you are able."],
    ["lR", "Very well, let us pass this challenge and receive our rewards."],
  ],
  story_fail: [
    ["Lr", "A <b>disappointing</b> performance. You have not yet proven yourself worthy of my gifts."],
    ["lR", "<b>Perseverance</b> is key."],
  ],
  story_win: [
    ["Lr", "Your performance has pleased me. This <b>gift</b> is now yours to take."],
  ],
  story_gift: [
    ["lR", "I can truly <b>fly</b> with these. How gratifying!"],
    ["lR", "Great Space Whale, my <b>decryption efforts</b> have come to nothing. What am I missing?"],
    ["Lr", "It is not only a matter of differing <b>languages</b>, but of differing <b>communication styles</b> altogether."],
    ["lR", "This… does not compute. What else is there but <b>language</b>?"],
    ["Lr", "Your question has been answered. Further questions? Find me again."],
  ],
};

levelData[55] = {
  story: [
    "I cannot grasp what the Space Whale meant.",
    "Another <b>method of communication</b>? Preposterous, one should think.",
    "There must be something I have not yet considered.",
    "I will cogitate further.",
  ],
  story_win: [
    "Your performance is admirable.",
  ],

};

levelData[56] = {
  story_win: [
    "Remember, my powers are at your disposal.",
  ],
};

levelData[57] = {
  story: [
    "I prefer not to do this, but I am going to access the <b>probe’s system</b> directly.",
    "This may take a moment…",
    "…",
    "<b>Puzzling</b>. My systems and the probe’s are completely incompatible.",
    "How <b>different</b> is the place from which this probe came?",
  ],
  story_win: [
    "You continue to impress.",
  ],

};

levelData[58] = {
  story_win: [
    "Hazards are heightening. Be careful.",
  ],
};

levelData[59] = {
  story_win: [
    "I have appreciated our time together.",
  ],
};

levelData[60] = {
  banner_story: "CANDY LEVEL",
  story: [
    ["Lr", "Take up my <b>challenge</b>. In <b>fifty seconds</b>, collect as much candy as you are able."],
    ["lR", "I anticipate our victory."],
  ],
  story_fail: [
    ["Lr", "A <b>disappointing</b> performance. You have not yet proven yourself worthy of my gifts."],
    ["lR", "<b>Perseverance</b> is key."],
  ],
  story_win: [
    ["Lr", "Your performance has pleased me. This <b>gift</b> is now yours to take."],
  ],
  story_gift: [
    ["lR", "I enjoy this caricature. Perhaps this is the start of a new <b>adventure</b>."],
    ["lR", "Great Space Whale, from where was this <b>probe</b> sent?"],
    ["Lr", "The probe arrived from a place that is as close to the <b>opposite</b> of Alphazoid Prime as any society could be."],
    ["Lr", "That place is known as <b>Glyphia</b>."],
    ["lR", "<b>Glyphia</b>, our opposite. It is not much, but it is a start."],
  ],
  story_chapterEnd: [
    "There is still much to discover about <b>Glyphia</b>.",
    "For example, what makes them the opposite of Alphazoid Prime?",
    "We are a <b>word-loving</b> galaxy. Could they not use words at all?",
    "That would explain why their messaging is so difficult to decode.",
    "If it is encoded at all, that is.",
  ],
};

// this is chapter #6
levelData[61] = {
  story_before_characters: ["tyto", "hemdar"],
  story_before: [
    ["Lr", "Doesn’t the <b>Deactivator</b> have enough energy to <b>unscramble</b> our words yet?"],
    ["lR", "By my estimate, the Deactivator should be at about <b>30% energy capacity</b>."],
    ["Lr", "How can you tell?"],
    ["lR", "It is merely a rough estimate based on my experience with similar devices."],
    ["lR", "However, Lexiborg technology is fairly consistent. I do not believe I am far off."],
    ["Lr", "I hope you’re right. I want our words back the way they were!"],
  ],

  story: [
    "I’m Glooper, from the artists’ colony, Znot.",
    "I want to do what I can to help. I’m just not sure how.",
  ],
  story_win: [
    "Well done!",
  ],

  button: 'START<br>CHAPTER<br>6',
};

levelData[62] = {
  story_win: [
    "Beautiful!",
  ],
};

levelData[63] = {
  story: [
    "All this <b>mysterious probe</b> stuff is way out of my area of expertise.",
    "Hemdar sent me this <b>weird message</b> to look at, but I can’t make heads or tails of it.",
    "I’m a humble <b>slime painter</b>. I don’t have his robot brains.",
    "Heck, I haven’t even been able to paint since letters started <b>vanishing</b>.",
    "I’ve worried my <b>inspiration</b> away. I don’t think I’ll be of use to you.",
  ],
  story_win: [
    "You dodged those bumpers with style!",
  ],

};

levelData[64] = {
  story_win: [
    "Excellent performance!",
  ],
};

levelData[65] = {
  story_win: [
    "Like poetry in action.",
  ],
};

levelData[66] = {
  banner_story: "CANDY LEVEL",
  story: [
    ["Lr", "Take up my <b>challenge</b>. In <b>fifty seconds</b>, collect as much candy as you are able."],
    ["lR", "Answers and gifts, here we come!"],
  ],
  story_fail: [
    ["Lr", "A <b>disappointing</b> performance. You have not yet proven yourself worthy of my gifts."],
    ["lR", "Well, we <b>shouldn’t give up</b>, right?"],
  ],
  story_win: [
    ["Lr", "Your performance has pleased me. This <b>gift</b> is now yours to take."],
  ],
  story_gift: [
    ["lR", "Mmm, <b>slimy</b> and <b>delicious</b>!"],
    ["lR", "Oh Great Space Whale, is there anything I can do to <b>help</b> my fellow Termarians?"],
    ["Lr", "Your <b>unique insight</b> will be key to solving a great mystery."],
    ["lR", "What insight? What do I have to offer?"],
    ["Lr", "Your question has been answered. Further questions? Find me again."],
    ["lR", "Okay. My <b>unique insight</b>… I’ll consider that."],
  ],
};

levelData[67] = {
  story: [
    "So, I’ve been looking at this <b>weird message</b> some more.",
    "Something seems <b>strange</b> about it, but I can’t quite figure out what.",
    "Like it <b>reminds</b> me of something…",
    "Let me think about it. Maybe it’ll come to me.",
  ],
  story_win: [
    "Magnifique, like a Lexiborg reborn!",
  ],

};

levelData[68] = {
  story_win: [
    "Inspiring!",
  ],
};

levelData[69] = {
  story: [
    "I figured it out! Well, sort of!",
    "This message wasn’t written in a language made of <b>letters</b> like ours.",
    "It’s <b>pictorial</b>!",
    "This image looks like a star, and this one is a face, I think.",
    "Let me see if I can arrive at some sort of <b>meaning</b>…",
  ],
  story_win: [
    "You make energy harvesting an art!",
  ],

};

levelData[70] = {
  story_win: [
    "What talent!",
  ],
};

levelData[71] = {
  story_win: [
    "You will always be welcome on Znot.",
  ],
};

levelData[72] = {
  banner_story: "CANDY LEVEL",
  story: [
    ["Lr", "Take up my <b>challenge</b>. In <b>fifty seconds</b>, collect as much candy as you are able."],
    ["lR", "We did it before, we can do it again!"],
  ],
  story_fail: [
    ["Lr", "A <b>disappointing</b> performance. You have not yet proven yourself worthy of my gifts."],
    ["lR", "Well, we <b>shouldn’t give up</b>, right?"],
  ],
  story_win: [
    ["Lr", "Your performance has pleased me. This <b>gift</b> is now yours to take."],
  ],
  story_gift: [
    ["lR", "Check me out! This is sure to <b>impress</b> at art shows!"],
    ["lR", "Great Space Whale, I just need a little help here. What do you think this glyph <b>represents</b>?"],
    ["Lr", "That is a <b>Lexiborg</b>."],
    ["lR", "Huh. I never knew what Lexiborgs <b>looked like</b> before."],
    ["lR", "It’s all coming together…"],
  ],
  story_chapterEnd: [
    "The message being sent back to <b>Glyphia</b> by the <b>probe</b> still isn’t completely clear to me.",
    "It seems like the probe came out here to look for <b>Lexiborgs</b>.",
    "The Lexiborgs are gone, of course, but the probe thinks those of us here now, the <b>Termarians</b>, are the same as the Lexiborgs!",
    "I don’t know why they sent a probe to look for Lexiborgs, but I have a <b>bad feeling</b> about it…",
  ],
};

// this is chapter #7
levelData[73] = {
  story_before_characters: ["jaleen", "hemdar"],
  story_before: [
    ["Lr", "So the <b>Glyphians</b> don’t use <b>words</b>? How bizarre."],
    ["lR", "It is not so strange, is it?"],
    ["lR", "We <b>machines</b> often receive communication via <b>electrical signals</b>."],
    ["Lr", "True."],
    ["lR", "The universe is vast, Jaleen."],
    ["Lr", "Maybe there are more ways to communicate we haven’t even thought of yet!"],
  ],

  story: [
    "Thorsaren, at thy command.",
    "The power of lightning bends to my will.",
    // defined in level XML:
    //
    // <h1>Lucky lightning!</h1><br:26>@sidekick says, here are powers to zap obstacles to help clear them.
    //
  ],
  story_win: [
    "A hero emerges!",
  ],
  button: 'START<br>CHAPTER<br>7',
};

levelData[74] = {
  story_win: [
    "Lightning shall clear thy path!",
  ],
};

levelData[75] = {
  story: [
    "What being in the universe would not look up to the great <b>Lexiborgs</b>?",
    "My hammer, <b>Mjolnir</b>, was crafted from a Lexiborg design.",
    "I have the utmost respect for our forebears.",
    "Come, explore with me their <b>greatness</b>!",
  ],
  story_win: [
    "It is no small feat to best Lexiborg tech!",
  ],

};

levelData[76] = {
  story_win: [
    "Thou art a force to be reckoned with!",
  ],
};

levelData[77] = {
  story_win: [
    "Do not let thy guard down now!",
  ],
};

levelData[78] = {
  banner_story: "CANDY LEVEL",
  story: [
    ["Lr", "Take up my <b>challenge</b>. In <b>fifty seconds</b>, collect as much candy as you are able."],
    ["lR", "A <b>trivial</b> affair."],
  ],
  story_fail: [
    ["Lr", "A <b>disappointing</b> performance. You have not yet proven yourself worthy of my gifts."],
    ["lR", "All hope is not lost! Once more, friend, <b>once more</b>!"],
  ],
  story_win: [
    ["Lr", "Your performance has pleased me. This <b>gift</b> is now yours to take."],
  ],
  story_gift: [
    ["lR", "These flavors art <b>astounding</b>!"],
    ["lR", "Pizza is truly a modern <b>ambrosia</b>."],
    ["lR", "Great Space Whale, I beg thee, enlighten us as to the <b>whereabouts</b> of our beloved Lexiborgs!"],
    ["Lr", "This information is beyond the scope of our arrangement."],
    ["lR", "Why dost thou insist on obscuring the most deeply desired knowledge in the universe?!"],
    ["Lr", "Your question has been answered. Further questions? Find me again."],
  ],
};

levelData[79] = {
  story_win: [
    "Thou art the storm personified!",
  ],
};

levelData[80] = {
  story_win: [
    "By the gods, thou hast done it again!",
  ],
};

levelData[81] = {
  story: [
    "Time and again the Great Space Whale has denied me the truth.",
    "Could this be the <b>limit</b> to its knowledge?",
    "Or does it <b>choose</b> to keep this from me?",
  ],
  story_win: [
    "I bear witness to thy unparalleled skill.",
  ],

};

levelData[82] = {
  story_win: [
    "Thou art filling the Deactivator as swift as lightning!",
  ],
};

levelData[83] = {
  story_win: [
    "Thou hast risen to thy task.",
  ],
};

levelData[84] = {
  banner_story: "CANDY LEVEL",
  story: [
    ["Lr", "Take up my <b>challenge</b>. In <b>fifty seconds</b>, collect as much candy as you are able."],
    ["lR", "We shalt be owed a compelling gift, if nothing else."],
  ],
  story_fail: [
    ["Lr", "A <b>disappointing</b> performance. You have not yet proven yourself worthy of my gifts."],
    ["lR", "All hope is not lost! Once more, friend, <b>once more</b>!"],
  ],
  story_win: [
    ["Lr", "Your performance has pleased me. This <b>gift</b> is now yours to take."],
  ],
  story_gift: [
    ["lR", "I shalt be as swift as <b>lightning</b>!"],
    ["lR", "Great Space Whale. Why, pray tell, dost thou <b>refuse</b> to reveal the present location of the Lexiborgs?"],
    ["Lr", "This information is withheld as part of an <b>ancient pact</b> between the Lexiborgs and myself."],
    ["lR", "How <b>clueless</b> I have been! They art lost only because they do not wish to be found."],
  ],
  story_chapterEnd: [
    "I am sure now that the Lexiborgs will only be revealed if they reveal themselves.",
    "Even so, it seems rather <b>odd</b>.",
    "Wouldst thou not want to <b>share</b> thy greatness if thou were as grand as the Lexiborgs?",
  ],
};

// this is chapter #8
levelData[85] = {
  story_before_characters: ["Murka", "Glooper"],
  story_before: [
    ["Lr", "Glooper, this cake is a work of art! What <b>beautiful</b> icing!"],
    ["lR", "How kind of you to say!"],
    ["Lr", "But beauty’s only one ingredient. Time for the <b>taste test</b>…"],
    ["Lr", "…hm."],
    ["lR", "Well?"],
    ["Lr", "Maybe you’d better stick to <b>art</b> from now on…"],
  ],

  story: [
    "I’m Sindert, an astro-surfer from planet Radiex.",
    "Not that I’ve been doing any surfing lately...",
  ],
  story_win: [
    "Hey, not bad! Let’s see what else you can do.",
  ],

  button: 'START<br>CHAPTER<br>8',
};

levelData[86] = {
  story_win: [
    "Looking cool!",
  ],
};

levelData[87] = {
  story: [
    "Jeepers creepers, I’m in a <b>mess</b> of a situation!",
    "My astro-board’s gone all <b>wonky</b>!",
    "It moves in strange patterns, ever since the <b>letters</b> started acting up.",
    "That’s what I get for upgrading it with <b>old Lexiborg tech</b>, I guess!",
    "I should see if there’s some way to <b>fix it</b>. I’m dying to ride!",
  ],
  story_win: [
    "All right, energy harvested! Let’s keep it up!",
  ],

};

levelData[88] = {
  story_win: [
    "Rad moves!",
  ],
};

levelData[89] = {
  story_win: [
    "Sweetness, more energy!",
  ],
};

levelData[90] = {
  banner_story: "CANDY LEVEL",
  story: [
    ["Lr", "Take up my <b>challenge</b>. In <b>fifty seconds</b>, collect as much candy as you are able."],
    ["lR", "I always rise to a challenge!"],
  ],
  story_fail: [
    ["Lr", "A <b>disappointing</b> performance. You have not yet proven yourself worthy of my gifts."],
    ["lR", "When you wipe out, you get back on that board and <b>try again</b>!"],
  ],
  story_win: [
    ["Lr", "Your performance has pleased me. This <b>gift</b> is now yours to take."],
  ],
  story_gift: [
    ["lR", "It’s not just about the movie."],
    ["lR", "It’s about the <b>experience</b>!"],
    ["lR", "Hey Whale, how do I fix my board? I kind of need it to work properly."],
    ["Lr", "Your astro-board’s balancer can be restored to functioning service via a <b>full energy recharge</b>."],
    ["lR", "Dude, it’s that simple? I guess we better get <b>harvesting</b>!"],
  ],
};

levelData[91] = {
  story_win: [
    "You’re on a roll!",
  ],
};

levelData[92] = {
  story_win: [
    "I could learn a thing or two from you!",
  ],
};

levelData[93] = {
  story: [
    "I was surfing in a <b>debris belt</b> nearby when my board started acting up.",
    "I had to get out lickety-split.",
    "I left something <b>important</b> out there, too.",
    "My board’s almost recharged, and then I’ll go grab it, <b>easy peasy</b>!",
    "I hope it’s still there…",
  ],
  story_win: [
    "Yes, another win!",
  ],

};

levelData[94] = {
  story_win: [
    "You make this look easy!",
  ],
};

levelData[95] = {
  story_win: [
    "I’d surf with you any time!",
  ],
};

levelData[96] = {
  banner_story: "CANDY LEVEL",
  story: [
    ["Lr", "Take up my <b>challenge</b>. In <b>fifty seconds</b>, collect as much candy as you are able."],
    ["lR", "I could do this with my eyes closed."],
  ],
  story_fail: [
    ["Lr", "A <b>disappointing</b> performance. You have not yet proven yourself worthy of my gifts."],
    ["lR", "When you wipe out, you get back on that board and <b>try again</b>!"],
  ],
  story_win: [
    ["Lr", "Your performance has pleased me. This <b>gift</b> is now yours to take."],
  ],
  story_gift: [
    ["lR", "Magical! You know, my brother <b>Jozi</b> can do magic for real."],
    ["lR", "So, I got my board working and went looking for something I lost."],
    ["lR", "But it wasn’t where I expected it to be. Where is it?"],
    ["Lr", "Your <b>precious object</b> was in danger of receiving damage in the debris belt."],
    ["Lr", "I retrieved it for safekeeping, and return it to you now."],
  ],
  story_chapterEnd: [
    "I’m glad I was able to get that thing back.",
    "Actually, it’s a <b>present</b> for my brother Jozi.",
    "Could you give this present to <b>Jozi</b> if you see him? Thanks, pal.",
  ],
};

// this is chapter #9
levelData[97] = {
  story_before_characters: ["Thorsaren", "Hemdar"],
  story_before: [
    ["Lr", "<b>Hemdar</b>! Reveal to me the <b>secret knowledge</b> locked inside thy chassis!"],
    ["lR", "To what knowledge could you possibly be referring?"],
    ["Lr", "Thou were created using <b>Lexiborg</b> technology, were thou not?"],
    ["lR", "Now I understand. Yes, some of my parts were once mementos of the Lexiborgs."],
    ["lR", "However, none contain any <b>knowledge</b> worth imparting."],
    ["lR", "It seems the Lexiborgs <b>made sure</b> of that fact."],
    ["Lr", "Oh, will mine thirst for knowledge ever be sated?!"],
  ],

  story: [
    "<span class='text-robot'>Beep-beep beep, beep boop!</span>",
    "<span class='text-label'>Translation:</span> I am Gillim, and we have some sleuthing to do!",
    // defined in level XML:
    //
    // <h1>Radar reveal!</h1><br:26>@sidekick says, here are powers to fully reveal all the letters for a moment.
    //
  ],
  story_win: [
    "<span class='text-robot'>Beep boop beep beep. Boop boop!</span><br> <span class='text-label'>Translation:</span> I’ve heard good things about you. Seems like they’re true!",
  ],
  button: 'START<br>CHAPTER<br>9',
};

levelData[98] = {
  story_win: [
    "<span class='text-robot'>Beep-beep boop, beep?</span><br> <span class='text-label'>Translation:</span> My power’s pretty great, right?",
  ],
};

levelData[99] = {
  story: [
    "<span class='text-robot'>Beep beep beep-beep beep beep beep.</span><br> <span class='text-label'>Translation:</span> I’ve been studying the Glyphian language used by the <b>probe</b>.",
    "<span class='text-robot'>Boop boop beep boop.</span><br> <span class='text-label'>Translation:</span> It’s <b>vital</b> that we know exactly what message is being sent back to Glyphia!",
    "<span class='text-robot'>Beep, beep beep-beep.</span><br> <span class='text-label'>Translation:</span> Luckily, I’m pretty good at <b>translation</b>.",
    "<span class='text-robot'>Beep, boop-boop…</span><br> <span class='text-label'>Translation:</span> Still, the Glyphian language is so different…",
    "<span class='text-robot'>Beep-beep beep.</span><br> <span class='text-label'>Translation:</span> I may need some <b>assistance</b>.",
  ],
  story_win: [
    "<span class='text-robot'>Beep, beep boop!</span><br> <span class='text-label'>Translation:</span> Hey, we make a good team!",
  ],

};

levelData[100] = {
  story_win: [
    "<span class='text-robot'>Boop boop-boop, beep?</span><br> <span class='text-label'>Translation:</span> This stuff’s a breeze for you, huh?",
  ],
};

levelData[101] = {
  story_win: [
    "<span class='text-robot'>Boop beep beep!</span><br> <span class='text-label'>Translation:</span> Don’t slow down now!",
  ],
};

levelData[102] = {
  banner_story: "CANDY LEVEL",
  story: [
    ["Lr", "Take up my <b>challenge</b>. In <b>fifty seconds</b>, collect as much candy as you are able."],
    ["lR", "<span class='text-robot'>Boop boop-boop. Beep beep!</span><br> <span class='text-label'>Translation:</span> It’s all about that <b>gift</b>. Let’s do it!"],
  ],
  story_fail: [
    ["Lr", "A <b>disappointing</b> performance. You have not yet proven yourself worthy of my gifts."],
    ["lR", "<span class='text-robot'>Beep beep beep!</span><br> <span class='text-label'>Translation:</span> Let’s take another crack at it!"],
  ],
  story_win: [
    ["Lr", "Your performance has pleased me. This <b>gift</b> is now yours to take."],
  ],
  story_gift: [
    ["lR", "<span class='text-robot'>Beep-beep!</span><br> <span class='text-label'>Translation:</span> <b>Yee-haw</b>!"],
    ["lR", "<span class='text-robot'>Beep, beep-boop. Beep, beep-beep boop-boop?</span><br> <span class='text-label'>Translation:</span> Thanks, Space Whale. Hey, is there anything I can do to make translating Glyphian <b>easier</b>?"],
    ["Lr", "There is a Lexiborg-developed <b>translation chip</b> that is compatible with your systems."],
    ["lR", "<span class='text-robot'>Boop! Beep beep boop?</span><br> <span class='text-label'>Translation:</span> Neat! Where do I get one of those?"],
    ["Lr", "Your question has been answered. Further questions? Find me again."],
    ["lR", "<span class='text-robot'>Boop, beep-beep.</span><br> <span class='text-label'>Translation:</span> Aw, nuts and bolts."],
  ],
};

levelData[103] = {
  story: [
    "<span class='text-robot'>Beeeeeep boop beep beep boop.</span><br> <span class='text-label'>Translation:</span> <b>Glooper</b> already figured out a few things about the probe’s message.",
    "<span class='text-robot'>Boop beep-beep beep boop-boop…</span><br> <span class='text-label'>Translation:</span> The Glyphians and Lexiborgs seem to have had <b>contact</b> in the past…",
    "<span class='text-robot'>Beep beep beep-boop, beeeep beep.</span><br> <span class='text-label'>Translation:</span> And the probe is telling Glyphia that the Lexiborgs are still around, that <b>we’re Lexiborgs</b>.",
    "<span class='text-robot'>Boop beep beep boop boop-beep.</span><br> <span class='text-label'>Translation:</span> The rest is still hazy without that <b>translation chip</b>.",
  ],
  story_win: [
    "<span class='text-robot'>Beep beep boop beep beep!</span><br> <span class='text-label'>Translation:</span> Not everyone can do this like you can!",
  ],

};

levelData[104] = {
  story_win: [
    "<span class='text-robot'>Beeeep!<br> <span class='text-label'>Translation:</span> Good stuff! We’re not doomed yet.",
  ],
};

levelData[105] = {
  story: [
    "<span class='text-robot'>Beep beep beep beep.</span><br> <span class='text-label'>Translation:</span> I’m really banging my bolts against this probe’s message.",
    "<span class='text-robot'>Boop-beep boop beep, boop boop.</span><br> <span class='text-label'>Translation:</span> I’m picking up some <b>hostility</b> from context, but nothing’s clear.",
    "<span class='text-robot'>Beep beep boop-beep beep…</span><br> <span class='text-label'>Translation:</span> I don’t think the Glyphians and Lexiborgs got along…",
    "<span class='text-robot'>Boop-beep. Beep beep beep.</span><br> <span class='text-label'>Translation:</span> I’m worried. We’d better ask about that <b>translation chip</b> again.",

  ],
  story_win: [
    "<span class='text-robot'>Boop-beep beep beep!</span><br> <span class='text-label'>Translation:</span> What expertise!",
  ],

};

levelData[106] = {
  story_win: [
    "<span class='text-robot'>Boop beep-beep beep boop!</span><br> <span class='text-label'>Translation:</span> This energy you’ve harvested will be greatly appreciated!",
  ],
};

levelData[107] = {
  story_win: [
    "<span class='text-robot'>Beep boop, beep beep beep!</span><br> <span class='text-label'>Translation:</span> No translation needed, your skills come through loud and clear!",
  ],
};

levelData[108] = {
  banner_story: "CANDY LEVEL",
  story: [
    ["Lr", "Take up my <b>challenge</b>. In <b>fifty seconds</b>, collect as much candy as you are able."],
    ["lR", "<span class='text-robot'>Beeeep boop boop!</span><br> <span class='text-label'>Translation:</span> This is for all the marbles!"],
  ],
  story_fail: [
    ["Lr", "A <b>disappointing</b> performance. You have not yet proven yourself worthy of my gifts."],
    ["lR", "<span class='text-robot'>Beep beep beep!</span><br> <span class='text-label'>Translation:</span> Let’s take another crack at it!"],
  ],
  story_win: [
    ["Lr", "Your performance has pleased me. This <b>gift</b> is now yours to take."],
  ],
  story_gift: [
    ["lR", "<span class='text-robot'>Boop Boop, beep boop!</span><br> <span class='text-label'>Translation:</span> Music is a language, and I’m <b>fluent</b>!"],
    ["lR", "<span class='text-robot'>Boop boop beep. Beep-boop, beep beep boop!</span><br> <span class='text-label'>Translation:</span> But I’m not fluent in Glyphian. Hey Space Whale, I need that <b>translation chip</b>!"],
    ["Lr", "Then the chip is yours."],
    ["lR", "<span class='text-robot'>Boooop… Beep. Beep-beep!</span><br> <span class='text-label'>Translation:</span> Installing… Oh wow. It works!"],
    ["lR", "<span class='text-robot'>Boop boop, beep-beep beep… Boop.</span><br> <span class='text-label'>Translation:</span> It’s not perfect, but I understand so much more now… <b>Oh no</b>."],
  ],
  story_chapterEnd: [
    "<span class='text-robot'>Beep boop boop beep beep!</span><br> <span class='text-label'>Translation:</span> The Glyphians and Lexiborgs were at <b>war</b>!",
    "<span class='text-robot'>Beep-beep, beep boop boop-beep!</span><br> <span class='text-label'>Translation:</span> And according to this, the <b>Lexiborgs</b> started it!",
    "<span class='text-robot'>Boop beep beep-beep boop.</span><br> <span class='text-label'>Translation:</span> Now the Glyphians are looking to take out the last of the Lexiborgs.",
    "<span class='text-robot'>Beep beep! Beep beep beep, beep boop!</span><br> <span class='text-label'>Translation:</span> They think that means us! We have to let them know we come in <b>peace</b>, before it’s too late!",
  ],
};

// this is chapter #10
levelData[109] = {
  story_before_characters: ["Murka", "Vasta"],
  story_before: [
    ["Lr", "Thanks for taste-testing my cookies, Vasta."],
    ["lR", "I would never turn down <b>free cookies</b>!"],
    ["Lr", "What do you think?"],
    ["lR", "They’re not your best, but they’re still scrumptious. Oof, I'm so <b>full</b>…"],
    ["Lr", "I guess I haven’t perfected them yet. How should I improve them?"],
    ["Lr", "Any ideas, Vasta? …Vasta?"],
    ["lR", "Zzz…"],
  ],
  story: [
    "I’m Rejka! I love a good hug and a peaceful nap.",
  ],
  story_win: [
    "That deserves a high five!",
  ],

  button: 'START<br>CHAPTER<br>10',
};

levelData[110] = {
  story_win: [
    "You seem way more reliable than me.",
  ],
};

levelData[111] = {
  story: [
    "I always imagined that the Lexiborgs were <b>kind and peaceful</b>, like me.",
    "They loved words, and I do too, after all.",
    "I can’t believe they <b>started a war</b> with the Glyphians…",
    "Maybe they had a good <b>reason</b>! We should ask the Great Space Whale.",
  ],
  story_win: [
    "You did it? That’s a relief!",
  ],

};

levelData[112] = {
  story_win: [
    "Take a deep breath… and let’s keep going!",
  ],
};

levelData[113] = {
  story_win: [
    "I love to see you succeed!",
  ],
};

levelData[114] = {
  banner_story: "CANDY LEVEL",
  story: [
    ["Lr", "Take up my <b>challenge</b>. In <b>fifty seconds</b>, collect as much candy as you are able."],
    ["lR", "That <b>special gift</b> sounds nice right now…"],
  ],
  story_fail: [
    ["Lr", "A <b>disappointing</b> performance. You have not yet proven yourself worthy of my gifts."],
    ["lR", "Just rest for a second and give it another go, okay?"],
  ],
  story_win: [
    ["Lr", "Your performance has pleased me. This <b>gift</b> is now yours to take."],
  ],
  story_gift: [
    ["lR", "I feel so cozy and warm! It’s making me kinda <b>sleepy</b>..."],
    ["lR", "But this is no time for a nap. Great Space Whale, why did the Lexiborgs start a war with the Glyphians?"],
    ["Lr", "To the Lexiborgs, <b>words</b> were the absolute <b>pinnacle</b> of communication."],
    ["Lr", "And so, they set out to make words the sole form of communication across the universe, <b>by force</b>."],
    ["lR", "Oh. Somehow it’s even worse than I thought."],
  ],
};

levelData[115] = {
  story_win: [
    "I knew you could do it!",
  ],
};

levelData[116] = {
  story_win: [
    "Keep it up and we may save our words yet!",
  ],
};

levelData[117] = {
  story: [
    "I’m still <b>shocked</b> by what we learned.",
    "All this time I’ve looked up to the Lexiborgs.",
    "Now I don’t know what to do.",
    "I kind of just want to take a long nap.",
  ],
  story_win: [
    "You’re a good one.",
  ],

};

levelData[118] = {
  story_win: [
    "Thanks for all this.",
  ],
};

levelData[119] = {
  story_win: [
    "You’ve earned a hug!",
  ],
};

levelData[120] = {
  banner_story: "CANDY LEVEL",
  story: [
    ["Lr", "Take up my <b>challenge</b>. In <b>fifty seconds</b>, collect as much candy as you are able."],
    ["lR", "I know we can succeed."],
  ],
  story_fail: [
    ["Lr", "A <b>disappointing</b> performance. You have not yet proven yourself worthy of my gifts."],
    ["lR", "Just rest for a second and give it another go, okay?"],
  ],
  story_win: [
    ["Lr", "Your performance has pleased me. This <b>gift</b> is now yours to take."],
  ],
  story_gift: [
    ["lR", "Hey little fellas, wanna take a <b>nap</b> later?"],
    ["lR", "Um, Great Space Whale… What am I supposed to do now?"],
    ["lR", "How do I go on when so much of what I thought I knew was <b>wrong</b>?"],
    ["Lr", "This is the rare question that I am <b>unqualified</b> to answer."],
    ["Lr", "You must find this answer <b>on your own</b>."],
  ],
  story_chapterEnd: [
    "I think I’ll be sad about this Lexiborg stuff for a while.",
    "But I’ll be thinking long and hard about what to do next.",
    "It looks like you’ll be meeting the fire-surfer <b>Tasha</b> next.",
    "I should pay them a visit soon, too. They’re always good for a fun time!",
  ],
};

// this is chapter #11
levelData[121] = {
  story_before_characters: ["Jaleen", "Barabell"],
  story_before: [
    ["Lr", "I’d love to make some <b>alterations</b> to this <b>Deactivator</b>."],
    ["lR", "It does have some <b>vexing</b> imperfections."],
    ["lR", "For example, how is one supposed to know how much more <b>energy</b> is necessary?"],
    ["Lr", "I reckon it’s about <b>60% full</b>, but that’s kind of a guess."],
    ["Lr", "Without an indicator, this thing isn’t very user friendly."],
    ["lR", "May we only have to use it this once, and then never again."],
  ],
  story: [
    "Expert fire-surfer Tasha, reporting in!",
    // defined in level XML:
    //
    // <h1>Radar reveal!</h1><br:26>@sidekick says, here are powers to fully reveal all the letters for a moment.
    //
  ],
  story_win: [
    "Happy to have you!",
  ],
  button: 'START<br>CHAPTER<br>11',
};

levelData[122] = {
  story_win: [
    "Things are heating up!",
  ],
};

levelData[123] = {
  story: [
    "I know there’s a lot going on, but sometimes you just need a <b>distraction</b> from it all, you know?",
    "So here’s what we’re gonna do, okay?",
    "The planet Pyron has these awesome <b>flaming seas</b>. I surf them all the time.",
    "But there’s one patch too hot and volatile even for me: <b>Sector 66</b>.",
    "I’m gonna figure out how to surf Sector 66, and you’re coming along for the ride!",
  ],
  story_win: [
    "With my power to help you, this should be a breeze!",
  ],

};

levelData[124] = {
  story_win: [
    "You’re on fire! Well, not literally.",
  ],
};

levelData[125] = {
  story_win: [
    "Energy galore! But we’re not done yet!",
  ],
};

levelData[126] = {
  banner_story: "CANDY LEVEL",
  story: [
    ["Lr", "Take up my <b>challenge</b>. In <b>fifty seconds</b>, collect as much candy as you are able."],
    ["lR", "Get me something cool!"],
  ],
  story_fail: [
    ["Lr", "A <b>disappointing</b> performance. You have not yet proven yourself worthy of my gifts."],
    ["lR", "No biggie, just give it another go."],
  ],
  story_win: [
    ["Lr", "Your performance has pleased me. This <b>gift</b> is now yours to take."],
  ],
  story_gift: [
    ["lR", "Do I look like I’m from the <b>future</b>? Or the <b>past</b>?"],
    ["lR", "Ahem. Oh Great Space Whale, how can I survive <b>Sector 66</b>?"],
    ["Lr", "A safe strategy would be to <b>avoid</b> Sector 66 entirely."],
    ["lR", "Very funny. No, for real, how do I survive Sector 66?"],
    ["Lr", "Your question has been answered. Further questions? Find me again."],
  ],
};

levelData[127] = {
  story_win: [
    "Watching you gives me hope.",
  ],

};

levelData[128] = {
  story_win: [
    "We can do this!",
  ],
};

levelData[129] = {
  story: [
    "I’ve surfed every inch of Pyron… <b>except</b> Sector 66.",
    "If I can finally get my board out there, I’ll be so pleased.",
    "There must be a way.",
    "We just have to squeeze an answer out of that <b>whale</b>!",
  ],
  story_win: [
    "You’re quick on your feet!",
  ],

};

levelData[130] = {
  story_win: [
    "You’re burning up! Figuratively, of course.",
  ],
};

levelData[131] = {
  story_win: [
    "You’re flying high!",
  ],
};

levelData[132] = {
  banner_story: "CANDY LEVEL",
  story: [
    ["Lr", "Take up my <b>challenge</b>. In <b>fifty seconds</b>, collect as much candy as you are able."],
    ["lR", "I’ll get my answer this time!"],
  ],
  story_fail: [
    ["Lr", "A <b>disappointing</b> performance. You have not yet proven yourself worthy of my gifts."],
    ["lR", "No biggie, just give it another go."],
  ],
  story_win: [
    ["Lr", "Your performance has pleased me. This <b>gift</b> is now yours to take."],
  ],
  story_gift: [
    ["lR", "I’m ready to take a <b>dive</b>!"],
    ["lR", "Great Space Whale. How do I <b>safely</b> surf the flames of Pyron’s <b>Sector 66</b>?"],
    ["Lr", "There are no methods that can truly be called <b>safe</b>."],
    ["Lr", "However, your <b>skills</b> may see you through this task. You need only be <b>fast</b>, and be <b>brave</b>."],
    ["lR", "I think I can handle that!"],
  ],
  story_chapterEnd: [
    "I’m excited to try surfing Sector 66 now!",
    "It might be too <b>advanced</b> for you, though, so maybe you should go back to… Oh yeah.",
    "You’re collecting energy for the <b>Deactivator</b>, right?",
    "I almost forgot. Didn’t it feel good to leave your stress <b>behind</b> for a little while?",
    "Good luck. I’m rooting for you!",
  ],
};

// this is chapter #12
levelData[133] = {
  story_before_characters: ["Gege", "Gillim"],
  story_before: [
    ["Lr", "Gillim! I challenge you to a game of <b>6D chess</b>!"],
    ["lR", "<span class='text-robot'>Boop? Beep-beep boop, beep boop-boop?</span><br> <span class='text-label'>Translation:</span>  Again? You do know that <b>sports</b> are your forte, not games of the mind?"],
    ["Lr", "Even so, I <b>won’t</b> lose again!"],
    ["lR", "<span class='text-robot'>Beep beep, boop boop? </span><br> <span class='text-label'>Translation:</span>  For the <b>fiftieth time</b>, you mean?"],
    ["lR", "<span class='text-robot'>Boop. Beep beep, beep-boop! </span><br> <span class='text-label'>Translation:</span>  Fine. If you like <b>losing</b> that much, then bring it on!"],
  ],
  story: [
    "Yo, I’m Jozi, from Radiex.",
    "Hey, don’t you know my sis, Sindert?",
  ],
  story_win: [
    "Thanks for the assist!",
  ],

  button: 'START<br>CHAPTER<br>12',
};

levelData[134] = {
  story_win: [
    "Sweetness!",
  ],
};

levelData[135] = {
  story: [
    "Dude, the <b>Glyphians</b> are coming.",
    "I can <b>sense</b> their vibes rippling out across space.",
    "If they get here before we’re ready, we’ll be in <b>big trouble</b>.",
    "We don’t know what they’re capable of.",
  ],
  story_win: [
    "Right on!",
  ],

};

levelData[136] = {
  story_win: [
    "Radical!",
  ],
};

levelData[137] = {
  story_win: [
    "All right, all right, all right!",
  ],
};

levelData[138] = {
  banner_story: "CANDY LEVEL",
  story: [
    ["Lr", "Take up my <b>challenge</b>. In <b>fifty seconds</b>, collect as much candy as you are able."],
    ["lR", "We’ve got that <b>present</b> in the bag!"],
  ],
  story_fail: [
    ["Lr", "A <b>disappointing</b> performance. You have not yet proven yourself worthy of my gifts."],
    ["lR", "No worries, pal. Just keep on groovin’."],
  ],
  story_win: [
    ["Lr", "Your performance has pleased me. This <b>gift</b> is now yours to take."],
  ],
  story_gift: [
    ["lR", "These are <b>rad</b>!"],
    ["lR", "All right Whalio, here’s a Q."],
    ["lR", "How do we let the Glyphians know that we’re <b>not Lexiborgs</b>?"],
    ["Lr", "Tell them."],
    ["lR", "What the what? I don’t think it’s gonna be that <b>easy</b>!"],
  ],
};

levelData[139] = {
  story_win: [
    "Seems like you’re working some magic of your own!",
  ],

};

levelData[140] = {
  story_win: [
    "Far out!",
  ],
};

levelData[141] = {
  story: [
    "Yo, I get how a <b>miscommunication</b> can turn into a huge mess.",
    "Me and my sister <b>Sindert</b> have been in a major <b>tuff</b> ever since I accidentally turned one of her boards into a vampire bat.",
    "Hold up, you have a <b>present</b> for me? From <b>Sindert</b>?",
    "I bet there’s something <b>mean</b> in here, to get back at me.",
    "That would be so <b>not cool</b>.",
  ],
  story_win: [
    "You’ve got to keep winning, yo.",
  ],

};

levelData[142] = {
  story_win: [
    "Hey, I believe in you!",
  ],
};

levelData[143] = {
  story_win: [
    "Hey, even if we don’t win this... It’s been real, pal.",
  ],
};

levelData[144] = {
  banner_story: "CANDY LEVEL",
  story: [
    ["Lr", "Take up my <b>challenge</b>. In <b>fifty seconds</b>, collect as much candy as you are able."],
    ["lR", "Let’s make some <b>magic</b>!"],
  ],
  story_fail: [
    ["Lr", "A <b>disappointing</b> performance. You have not yet proven yourself worthy of my gifts."],
    ["lR", "No worries, pal. Just keep on groovin’."],
  ],
  story_win: [
    ["Lr", "Your performance has pleased me. This <b>gift</b> is now yours to take."],
  ],
  story_gift: [
    ["lR", "Hey, this <b>wand</b> really works! Maybe I should use it all the time!"],
    ["lR", "All right Space Whale, let’s try this again."],
    ["lR", "What, <b>specifically</b>, can we do to halt the Glyphian attack?"],
    ["Lr", "The key is <b>communication</b>. The only variable is whether they will <b>listen</b>."],
    ["lR", "Dang, maybe it is that simple."],
  ],
  story_chapterEnd: [
    "Guess what? I opened <b>Sindert’s present</b>! It was a <b>walkie-talkie</b>!",
    "This thing is so <b>retro</b>. It doesn’t even work.",
    "But, I know what she’s trying to say.",
    "She wants to, like, <b>communicate</b> with me. I guess I should pay her a <b>visit</b>.",
    "And I should do it soon, before it’s <b>too late</b>, you know?",
  ],
};

// this is chapter #13
levelData[145] = {
  story_before_characters: ["Rejka", "Tasha"],
  story_before: [
    ["Lr", "Maybe I’ll feel better after a <b>long nap</b>…"],
    ["lR", "No time for napping, buddy!"],
    ["Lr", "Tasha?!"],
    ["lR", "I’m here to break you out of your <b>funk</b>!"],
    ["lR", "And nothing’s better for a case of the blues than a jolt of <b>adrenaline</b>!"],
    ["Lr", "Don’t tell me we’re going fire-surfing…"],
    ["lR", "We’re going <b>fire-surfing</b>!"],
  ],
  story: [
    "Gege’s the name, and I’m the fittest ruby hexapus around.",
    "I’m not afraid to stretch my skills if it’ll help Alphazoid Prime!",
    // defined in level XML:
    //
    // <h1>Terrific tentacles!</h1><br:26>@sidekick says, here are powers that give your core words reachy arms.
    //
  ],
  story_win: [
    "Victory will never be out of reach with my power!",
  ],

  button: 'START<br>CHAPTER<br>13',
};

levelData[146] = {
  story_win: [
    "I’m cheering for you!",
  ],
};

levelData[147] = {
  story: [
    "We’re in the <b>last quarter</b> of this galactic game we’re playing now.",
    "We’re just working out the last kinks in our <b>plan</b>.",
    "Meanwhile, we’ll be needing that <b>energy</b> you’ve been harvesting soon!",
    "Let’s do what we can to ensure a <b>home run</b>!",
  ],
  story_win: [
    "Score!",
  ],

};

levelData[148] = {
  story_win: [
    "Bumpers make for lousy goalies!",
  ],
};

levelData[149] = {
  story_win: [
    "Touchdown!",
  ],
};

levelData[150] = {
  banner_story: "CANDY LEVEL",
  story: [
    ["Lr", "Take up my <b>challenge</b>. In <b>fifty seconds</b>, collect as much candy as you are able."],
    ["lR", "We’re in it to win it!"],
  ],
  story_fail: [
    ["Lr", "A <b>disappointing</b> performance. You have not yet proven yourself worthy of my gifts."],
    ["lR", "Let’s go for a higher score this time!"],
  ],
  story_win: [
    ["Lr", "Your performance has pleased me. This <b>gift</b> is now yours to take."],
  ],
  story_gift: [
    ["lR", "My arms make this <b>easy</b>!"],
    ["lR", "Oh, Great Space Whale… What’s going to happen if we can’t convince the Glyphians to <b>stand down</b>?"],
    ["Lr", "They will <b>attack</b>, with a mind to <b>destroy</b>. Beyond that, no one knows. Not even I."],
    ["lR", "Then we just have to make sure we win."],
  ],
};

levelData[151] = {
  story_win: [
    "Take your best shot, Glyphians!",
  ],
};

levelData[152] = {
  story_win: [
    "Nothing but net!",
  ],
};

levelData[153] = {
  story: [
    "We have a <b>great team</b>.",
    "There’s no one else I’d draft.",
    "Even so… You can never know for sure how a game’s gonna go.",
  ],
  story_win: [
    "Another point for the good guys!",
  ],

};

levelData[154] = {
  story_win: [
    "We’re almost to the goal!",
  ],
};

levelData[155] = {
  story_win: [
    "It may seem grim, but we’ve gotta keep up morale!",
  ],
};

levelData[156] = {
  banner_story: "CANDY LEVEL",
  story: [
    ["Lr", "Take up my <b>challenge</b>. In <b>fifty seconds</b>, collect as much candy as you are able."],
    ["lR", "We’re up to the task!"],
  ],
  story_fail: [
    ["Lr", "A <b>disappointing</b> performance. You have not yet proven yourself worthy of my gifts."],
    ["lR", "Let’s go for a higher score this time!"],
  ],
  story_win: [
    ["Lr", "Your performance has pleased me. This <b>gift</b> is now yours to take."],
  ],
  story_gift: [
    ["lR", "Beware the wrath of <b>Gege the Great</b>!"],
    ["lR", "Oh, Space Whale… Can’t you <b>reassure</b> me, tell me everything will be all right?"],
    ["Lr", "You lack <b>confidence</b>, but do you lack <b>trust</b>?"],
    ["lR", "No. I know my friends will do their best."],
    ["lR", "I guess that’s all any of us can do."],
  ],
  story_chapterEnd: [
    "I play a lot of <b>sports</b> in my free time.",
    "Like grav-soccer, <b>vexxis</b>, kickball, <b>floxball</b>…",
    "I love to win, and I can be a bit of a <b>sore loser</b>.",
    "But I’ve never been this <b>scared</b> of a loss before.",
    "I think I’ll look at losing a little <b>differently</b> from now on.",
  ],
};

// this is chapter #14
levelData[157] = {
  story_before_characters: ["Gillim", "Glooper"],
  story_before: [
    ["Lr", "<span class='text-robot'>Beep-beep boop beep beep! </span><br> <span class='text-label'>Translation:</span> Our message to the <b>Glyphians</b> is coming along nicely!"],
    ["lR", "It will have to be a <b>masterpiece</b> if we want to save Alphazoid Prime. "],
    ["lR", "What else should we tell them?"],
    ["Lr", "<span class='text-robot'>Beep beep-beep boop beep boop! </span><br> <span class='text-label'>Translation:</span> Maybe we should <b>embellish</b> a little so they think we’re really awesome!"],
    ["Lr", "<span class='text-robot'>Beep, boop beep beep-beep, beep beep boop! </span><br> <span class='text-label'>Translation:</span> Ooh, tell them if you trap Astra in a meteorite lamp, she’ll grant <b>three wishes</b>!"],
    ["lR", "…I’m not doing that."],
  ],
  story: [
    "Hi, I’m Vasta. I spend my days relaxing in space blossom fields and munching on flowers.",
  ],
  story_win: [
    "Phew, you did it!",
  ],

  button: 'START<br>CHAPTER<br>14',
};

levelData[158] = {
  story_win: [
    "You’re pretty good at this by now, huh?",
  ],
};

levelData[159] = {
  story: [
    "Glooper and Gillim are working on a <b>message</b> for the Glyphians.",
    "But I don’t think a simple message will be <b>enough</b>.",
    "It needs something else, to really show that we’re <b>friendly</b>.",
    "I just don’t know what yet.",
  ],
  story_win: [
    "Those mines sure make me nervous. I’m glad you’re okay!",
  ],

};

levelData[160] = {
  story_win: [
    "You got the energy. What a relief!",
  ],
};

levelData[161] = {
  story_win: [
    "Ahh, I can’t watch… Oh, you did it. Yay!",
  ],
};

levelData[162] = {
  banner_story: "CANDY LEVEL",
  story: [
    ["Lr", "Take up my <b>challenge</b>. In <b>fifty seconds</b>, collect as much candy as you are able."],
    ["lR", "I wonder what our <b>special gift</b> will be!"],
  ],
  story_fail: [
    ["Lr", "A <b>disappointing</b> performance. You have not yet proven yourself worthy of my gifts."],
    ["lR", "Take a rest and try again."],
  ],
  story_win: [
    ["Lr", "Your performance has pleased me. This <b>gift</b> is now yours to take."],
  ],
  story_gift: [
    ["lR", "Do these look like <b>berries</b> to you? Or is it just me?"],
    ["lR", "Oh Great Space Whale, what should we add to our <b>message</b> to the Glyphians?"],
    ["lR", "We need something to show them our <b>good will</b>."],
    ["Lr", "What would do the same for you?"],
    ["lR", "Well, I was just thinking how much I appreciate this gift."],
    ["lR", "That’s it! A <b>gift</b>! Everyone likes gifts!"],
  ],
};

levelData[163] = {
  story_win: [
    "You’re so brave!",
  ],
};

levelData[164] = {
  story_win: [
    "Nice! I think we deserve a snack.",
  ],
};

levelData[165] = {
  story: [
    "Getting a <b>present</b> from someone always makes me happy.",
    "If they got a <b>gift</b> from us, they’d know we’re friendly for sure.",
    "All I need now is to come up with the perfect gift.",
  ],
  story_win: [
    "I know things look grim, but you’re doing good.",
  ],

};

levelData[166] = {
  story_win: [
    "You’re an invaluable asset.",
  ],
};

levelData[167] = {
  story_win: [
    "You can do this. You can save us.",
  ],
};

levelData[168] = {
  banner_story: "CANDY LEVEL",
  story: [
    ["Lr", "Take up my <b>challenge</b>. In <b>fifty seconds</b>, collect as much candy as you are able."],
    ["lR", "You can never get too many gifts!"],
  ],
  story_fail: [
    ["Lr", "A <b>disappointing</b> performance. You have not yet proven yourself worthy of my gifts."],
    ["lR", "Take a rest and try again."],
  ],
  story_win: [
    ["Lr", "Your performance has pleased me. This <b>gift</b> is now yours to take."],
  ],
  story_gift: [
    ["lR", "These feathers are a beacon of <b>hope</b>."],
    ["lR", "Great Space Whale, what kind of <b>gift</b> would the Glyphians like?"],
    ["Lr", "It is the <b>thought</b> that counts."],
    ["lR", "That’s no help!"],
    ["lR", "But maybe it will mean more if we come up with it on our own."],
  ],
  story_chapterEnd: [
    "I need to think a little more about what to give the <b>Glyphians</b>.",
    "Don’t worry, I’ll send it along right away.",
    "Go to <b>Astra</b>, and help her finish this. There isn’t much time left!",
  ],
};

// this is chapter #15
levelData[169] = {
  story_before_characters: ["Sindert", "Jozi"],
  story_before: [
    ["Lr", "Hey Bro, how’re the vibes?"],
    ["lR", "<b>Sindert</b>! I’m stoked that we can chat before things go south, but I’m surprised."],
    ["lR", "I thought you’d be way <b>angrier</b> with me."],
    ["Lr", "That’s your <b>problem</b>, dude! You always assume the worst."],
    ["Lr", "I did flip out when you <b>transmogrified</b> my board…"],
    ["Lr", "But I was only mad for, like, a <b>nanosecond</b>. It’s all good!"],
    ["lR", "Aw, man. Thanks for being <b>chill</b>, Sis."],
  ],
  story: [
    "I am Astra, a unicorn of Theson.",
    "Us unicorns live a long time, and pass down stories throughout the ages.",
  ],
  story_win: [
    "This is a story worth telling.",
  ],

  button: 'START<br>CHAPTER<br>15',
};

levelData[170] = {
  story_win: [
    "What an exciting chapter this will be.",
  ],
};

levelData[171] = {
  story: [
    "It is nearly time to tell the Glyphians our <b>story</b>.",
    "They will know <b>who we are</b>, and <b>who we are not</b>.",
    "They will know <b>what we want</b>, and <b>what we do not</b>.",
    "The words of Alphazoid Prime can be <b>reshaped</b> into <b>glyphs</b>.",
    "However, they must be <b>unscrambled</b> first.",
    "Please, harvest the last of the energy the <b>Deactivator</b> needs.",
  ],
  story_win: [
    "Heroic deed after heroic deed.",
  ],

};

levelData[172] = {
  story_win: [
    "Remain vigilant. There are challenges to overcome yet.",
  ],
};

levelData[173] = {
  story_win: [
    "This will be the pinnacle of Alphazoid Prime’s history.",
  ],
};

levelData[174] = {
  banner_story: "CANDY LEVEL",
  story: [
    ["Lr", "Take up my <b>challenge</b>. In <b>fifty seconds</b>, collect as much candy as you are able."],
    ["lR", "I will bear witness to your success."],
  ],
  story_fail: [
    ["Lr", "A <b>disappointing</b> performance. You have not yet proven yourself worthy of my gifts."],
    ["lR", "The story isn’t over yet."],
  ],
  story_win: [
    ["Lr", "Your performance has pleased me. This <b>gift</b> is now yours to take."],
  ],
  story_gift: [
    ["lR", "Thank you. I feel renewed by <b>flavor</b>."],
    ["lR", "Great Space Whale, how much more energy does the <b>Deactivator</b> need?"],
    ["Lr", "Be diligent. You have nearly reached your goal."],
    ["lR", "With little <b>time</b> to spare."],
    ["lR", "I have heard from <b>Jozi</b>. He senses the Glyphians approaching rapidly."],
    ["lR", "We, too, must be <b>swift</b>."],
  ],
};

levelData[175] = {
  story_win: [
    "You are to be the stuff of legends.",
  ],
};

levelData[176] = {
  story_win: [
    "I look forward to regaling my successors with this tale.",
  ],
};

levelData[177] = {
  story: [
    "You may recall that <b>Vasta</b> wanted to add a gift to our message to the Glyphians.",
    "He has come through with his <b>gift</b>. Or rather, <b>our</b> gift.",
    "He has included a little something from many Termarians you know, to represent <b>all of us</b>.",
    "Space blossoms from <b>Vasta</b>, cookies from <b>Murka</b>, a book from <b>Tyto</b>...",
    "All in a basket with a beacon, so they can’t be missed.",
    "These pieces of us will help the Glyphians to <b>understand</b>, or so we hope.",
  ],
  story_win: [
    "You have proven yourself the hero of this story.",
  ],

};

levelData[178] = {
  story_win: [
    "Your feats will be remembered for centuries to come.",
  ],
};

levelData[179] = {
  story_win: [
    "It is time to turn the page.",
  ],
};

levelData[180] = {
  banner_story: "CANDY LEVEL",
  story: [
    ["Lr", "Take up my <b>challenge</b>. In <b>fifty seconds</b>, collect as much candy as you are able."],
    ["lR", "One last time."],
  ],
  story_fail: [
    ["Lr", "A <b>disappointing</b> performance. You have not yet proven yourself worthy of my gifts."],
    ["lR", "The story isn’t over yet."],
  ],
  story_win: [
    ["Lr", "Your performance has pleased me. This <b>gift</b> is now yours to take."],
  ],
  story_gift: [
    ["lR", "Thank you, but you deserve this <b>crown</b> more than I."],
    ["lR", "Great Space Whale, the <b>Glyphians</b> are nearly here and our words out in space are still <b>scrambled</b>."],
    ["lR", "Do we not have enough energy for the <b>Deactivator</b>? What went wrong?"],
    ["Lr", "Patience, Termarian. Your will shall be done."],
    ["lR", "Patience? But… Wait. Yes, yes, I see it happening now!"],
  ],
  story_chapterEnd: [
    "Our words are unscrambling! They are <b>legible</b> again!",
    "Bumpers and mines are becoming <b>inert</b>!",
    "The words are moving, changing. Yes, Gillim is <b>reshaping our words</b> to be understood by the Glyphians!",
    "Just in time, it seems. <b>Jozi</b> is speaking into my mind. He says they’re <b>here</b>.",
    "They have a <b>great army</b>, ships the size of asteroids.",
    "Jozi says they’ve paused. To read our <b>message</b>, one hopes.",
    "They’re… taking the gift basket. And <b>leaving</b>! We’ve done it!",
    "Thank you, for helping bring this story to a satisfying <b>resolution</b>.",
    "However, I cannot help but hope for an <b>epilogue</b>.",
    "One where Glyphians and Termarians exist not only in peace, but in <b>harmony</b>.",
  ],
};


export {
  defaultLevelDataNormal,
  defaultLevelDataTutorial,
  defaultLevelDataBonus,
  levelData
}