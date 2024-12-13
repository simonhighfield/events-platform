const tempAllEvents = [
    {
        skiddle_event_id: "40422508",
        event_name: "XLR Residents: Christmas Special",
        event_date: "2024-12-12T22:00:00+00:00",
        description: "XLR is bringing the heat this Christmas, turning up the bass and decking the halls with the best in house, deep, and tech beats.",
        event_photo_url: "https://d31fr2pwly4c4s.cloudfront.net/0/6/f/1882169_84a41aad_xlr-residents-christmas-special_th.jpg",
        location: "XLR",
        contributors: [],
        created_at: null
    },
    {
        skiddle_event_id: "40038884",
        event_name: "The Club That Stole Christmas // Venue Thursdays",
        event_date: "2024-12-12T22:30:00+00:00",
        description: "Venue Thursdays are here with weekly specials and some of the best drinks offers in Manchester. This week, The Christmas Special",
        event_photo_url: "https://d31fr2pwly4c4s.cloudfront.net/9/5/4/1810927_9b0d44ba_the-club-that-stole-christma-venue-thursdays_th.jpg",
        location: "The Venue Nightclub",
        contributors: [],
        created_at: null
    },
    {
        skiddle_event_id: "40036309",
        event_name: "Whip Round",
        event_date: "2024-12-12T23:00:00+00:00",
        description: "Your favourite weekly Alt club night is back for a 3rd year!",
        event_photo_url: "https://d1plawd8huk6hh.cloudfront.net/assets/default400.png",
        location: "The Deaf Institute",
        contributors: [],
        created_at: null
    },
    {
        skiddle_event_id: "40056612",
        event_name: "Tropiloco Thursdays @ Factory",
        event_date: "2024-12-12T23:00:00+00:00",
        description: "Tropiloco Thursdays @ Factory - Freshers Week - the Uk's Hottest Weekly Party // Every Thursday at Factory",
        event_photo_url: "https://d31fr2pwly4c4s.cloudfront.net/d/9/7/1816119_b914d0dc_tropiloco-thursdays-factory_th.jpg",
        location: "Factory Manchester",
        contributors: [],
        created_at: null
    },
    {
        skiddle_event_id: "40451552",
        event_name: "Discotek - 2024 Season Finale!  - The Essential mid week turn up",
        event_date: "2024-12-12T23:00:00+00:00",
        description: "The Essential Midweek Turn up",
        event_photo_url: "https://d31fr2pwly4c4s.cloudfront.net/a/a/f/1888707_55583834_Discotek---Every-Thursday---The-Essential-mid-week-turn-up_th.jpg",
        location: "Joshua Brooks",
        contributors: [],
        created_at: null
    },
    {
        skiddle_event_id: "40092446",
        event_name: "DNB Allstars",
        event_date: "2024-12-13T20:00:00+00:00",
        description: "Depot (Mayfield), Manchester - Friday 13th December 2024",
        event_photo_url: "https://d31fr2pwly4c4s.cloudfront.net/9/3/2/1827841_e3e844e3_dnb-allstars_th.jpg",
        location: "Depot (Mayfield)",
        contributors: ["Hedex", "T & Sugah", "A Little Sound"],
        created_at: null
    },
    {
        skiddle_event_id: "40233094",
        event_name: "Only Bounce Friday the 13th",
        event_date: "2024-12-13T20:00:00+00:00",
        description: "Join us at our next event, only bounce Friday the 13th",
        event_photo_url: "https://d31fr2pwly4c4s.cloudfront.net/c/a/c/1849501_2a4b9160_only-bounce-friday-the-13th_th.jpg",
        location: "The Venue Bolton",
        contributors: ["DJ Cheeze", "MC Finchy"],
        created_at: null
    },
    {
        skiddle_event_id: "39301742",
        event_name: "Future Force Presents BURNING MAN FUTURE CHIC",
        event_date: "2024-12-13T21:00:00+00:00",
        description: "Burning Man-Future Chic is coming to Club MN1 on Friday the 13th December.\n\nJoin us for an unforgettable night under the lights this festive period!",
        event_photo_url: "https://d31fr2pwly4c4s.cloudfront.net/c/1/b/1785173_78c34e2b_future-force-presents-burning-man-future-chic_th.jpg",
        location: "Vision Nightclub",
        contributors: ["Brandon Block", "Jon Fitz", "Allister Whitehead"],
        created_at: null
    },
    {
        skiddle_event_id: "40100252",
        event_name: "Code",
        event_date: "2024-12-13T22:00:00+00:00",
        description: "CODE returns after the last sell out show with another line up that promises only the best in underground Jungle & DnB..",
        event_photo_url: "https://d31fr2pwly4c4s.cloudfront.net/2/f/a/1831068_faa0241d_code_th.jpg",
        location: "Mint Lounge",
        contributors: ["Krust", "ORCA", "DJ KANE."],
        created_at: null
    },
    {
        admin_event_id: "a0e78e74-0cc9-407f-ba4f-3f4f6c245cac",
        created_at: "2024-12-09T19:36:38.577461+00:00",
        event_name: "test admin event",
        event_date: "2024-12-20T00:00:00+00:00",
        description: "The coolest party",
        event_photo_url: "https://images.unsplash.com/photo-1620909868342-5659c05ab5e5?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        location: "Manchester",
        contributors: ["DJ 1", "DJ 2"]
    }
];

const tempSavedEvents = [
    tempAllEvents[0],
    tempAllEvents[1],
    tempAllEvents[9],
    tempAllEvents[10] // Includes an admin_event_id
];

export { tempAllEvents, tempSavedEvents };
