# parkadoo

## What is parkadoo?
This is an experimental project to help people understand Edmonton parking laws better and create a letter that can help with the appeal process. There are three letter types:

1. Public parking ticket appeal
2. Private parking lot appeal
3. Neighbour complaint/warning

Available to view at [parkadoo.com](https://parkadoo.com) or [parkadoo.netlify.app](parkadoo.netlify.app/)


## UI examples

### Light and dark mode 
<img src="https://user-images.githubusercontent.com/48400779/139737501-d5032be4-02a0-415a-9a5a-770632559fc4.PNG" width="250"> <img src="https://user-images.githubusercontent.com/48400779/139737519-eb9f4108-f2e5-4116-a316-af44f4c28127.PNG" width="250"> <img src="https://user-images.githubusercontent.com/48400779/139737508-933df7ff-3327-41fb-8301-008abd763c5a.PNG" width="250"> <img src="https://user-images.githubusercontent.com/48400779/139737515-ccf8a153-72a3-4eb9-9073-9d271f285253.PNG" width="250">


### Checking bylaws

- Make it easier to check bylaws by using providing a list, summarizing in plain language, and linking to official bylaw.

<img src="https://user-images.githubusercontent.com/48400779/139737561-b5f570e9-f53c-468a-aeac-cca2b233e59d.PNG" width="250"> <img src="https://user-images.githubusercontent.com/48400779/139736957-fdc9a339-0a80-4f8b-9d1e-a176bf558bc7.PNG" width="250">


### Creating an appeal letter

https://user-images.githubusercontent.com/48400779/139738865-407aece7-31fe-4b14-b829-dc2eee35aff1.mov 
https://user-images.githubusercontent.com/48400779/139738868-ba373c40-262f-49b2-9f2a-c87e194875de.mov


### Appeal letter (city)

- Appeal letter page gives links to next steps, common letter actions, and a letter preview

https://user-images.githubusercontent.com/48400779/139736044-146ffdba-6d1a-46a8-a081-5d81d243a57e.mov


### Scrolling

- Goal was to mimic the fluidity of a native messaging by having current step update as user scrolls up/down

https://user-images.githubusercontent.com/48400779/139736229-f5e7fa38-093d-45a0-8f6f-cc918f96b216.mov



## How to set up

1. Clone git repository
2. Navigate to project folder and run ```npm install``` to install dependencies 
3. Open terminal and run ```npm start``` to start a local server 
3. View on localhost address shown in terminal

## Philosphy

- Goal was to reduce external dependencies as much as possible. Uses vanilla JS, CSS, HTML
- Uses es6 modules so needs a local server to run while developing
- User data is not collected and user answers are saved to user's device and clears after their browsing session ends
- Mimic native messaging apps by allowing the step-by-step wizard to update active section via buttons but also on scroll. See example section above for video.


## Other notes

- 3D UFO graphic designed by me using Spline
