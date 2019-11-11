"use strict";

  // Bylaw info box variables
let checkBylawsOutputTemplate = "";
let cityBylawLink = document.getElementsByClassName("city-bylaw-link").href = "https://www.edmonton.ca/transportation/Bylaws/C5590.pdf"; // Can expand this functionality as add more cities
let cityBylawName = "Bylaw 5590";
  // Edmonton bylaw object
let bylawTextObj = {
ticketReason1: "parking in an expired meter zone",
checkBylawsPlainLanguageHint1: "Looks like you shouldn't get a ticket if you still have time on the meter, have a permit displayed, or park during the meter's off-hours.",
ticketBylawExplanation1: "<ul>s(42)<li>(1) A vehicle shall not be parked on a highway in any space governed by a parking meter unless there is unexpired time remaining on the meter.</li><li>(2) This section is only in effect on the days and during the times a parking meter is identified as being in effect.</li><li>(3) This section does not apply to a vehicle displaying a valid and subsisting permit issued by the City for metered space parking so long as all conditions of the permit are satisfied.</li></ul>",

ticketReason2: "being parked in excess of posted limit in a time restricted zone",
checkBylawsPlainLanguageHint2: "This one is pretty straightforward. You need to stay within the displayed time limit if there is a parking sign nearby.",
ticketBylawExplanation2: "<ul>s(38) <li>A vehicle shall not be parked on a highway in any location identified as a time limited zone for a period of time in excess of the time limit.</li></ul>",

ticketReason3: "parking outside a metered space",
checkBylawsPlainLanguageHint3: "Looks like in order to avoid a ticket you need to have been parked within the metered space. You should also park as close as possible to the meter.",
ticketBylawExplanation3: "<ul>s(43) <li>A vehicle parked on a highway in any space governed by a parking meter shall: <br>(a) be parked completely within the metered space; and </li><li>(b) if the metered space is parallel to the edge of the roadway, be parked so that: <br>(i) the front of the vehicle is as close as possible to the parking meter if the meter is situated at the front of the space; or <br>(ii) the rear of the vehicle is  as close as possible to the parking meter if the meter is situated at the rear of the space; or <br>(iii) if the metered space is at an angle to the edge of the roadway, be parked so that the front of the vehicle is as close as possible to the parking meter.</li></ul>",

ticketReason4: "parking in a closed pay and display zone",
checkBylawsPlainLanguageHint4: "You can't park in a closed pay and display zone.",
ticketBylawExplanation4: "<ul>s(46) <li>A vehicle shall not be parked on a highway in any space identified as a pay and display zone when that zone is closed.</li></ul>",

ticketReason5: "parking in a space with a hooded meter",
checkBylawsPlainLanguageHint5: "You can't park in front of a covered meter.",
ticketBylawExplanation: "<ul>s(44) <li>A vehicle shall not be parked on a highway in any space governed by a parking meter on which a hood or cover has been placed.</li></ul>",

ticketReason6: "parking too close to a stop or yield sign",
checkBylawsPlainLanguageHint6: "You can't park within 5 metres of a stop or yield sign unless a traffic sign indicates otherwise.",
ticketBylawExplanation6: "<ul>s(6) <li>Unless a traffic control device permits or requires, a vehicle shall not be parked in the case of an approach to a stop sign or yield sign within 5 metres of the stop sign or yield sign.</li></ul>",

ticketReason7: "parking too close to a crosswalk",
checkBylawsPlainLanguageHint7: "You can't park within 5 metres of the nearest side of a crosswalk unless a sign indicates otherwise.",
ticketBylawExplanation: "<ul>s(5) <li>Unless a traffic control device permits or requires, a vehicle shall not be parked: <br><br>(a) on a crosswalk or any part of a crosswalk; or <br><br>(b) within 5 metres of the near side of a marked crosswalk.</li></ul>",

ticketReason8: "parking too close to a fire hydrant",
checkBylawsPlainLanguageHint8: "You can't park or stop within 5 metres of a fire hydrant (or the nearest curb). There is an exception if you are a taxi in a taxi zone and remain in the vehicle.",
ticketBylawExplanation8: "<ul>s(8) <li>(1) Except as permitted in this section a vehicle shall not be stopped on a highway within 5 metres of a fire hydrant or, when the hydrant is not located at the curb, within 5 metres from the point on the curb nearest the fire hydrant.</li><li>(2) A taxi may stop within 5 metres of a hydrant identified as a taxi zone only if: <br><br>(i) the operator remains in the vehicle at all times; and <br><br>(ii) the operator immediately removes the vehicle from the taxi zone upon the direction of a peace officer or a member of the City’s Fire Rescue Service.</li></ul>",

ticketReason9: "parking too close to an intersection",
checkBylawsPlainLanguageHint9: "Looks like you can't park within 5 metres of an intersection or 1.5 metres from a private access, driveway, or any other vehicle crossing over a sidewalk unless a sign states otherwise.",
ticketBylawExplanation9: "<ul>s(7) <li>Unless a traffic control device permits or requires, a vehicle shall not be parked: <br><br>(a) at an intersection within 5 metres of the projection of the curb or edge of the roadway; <br><br>(b) within an intersection other than immediately next to the curb or edge of the roadway in a “T” intersection; or <br><br>(c) within 1.5 metres of an access to a garage, private road or driveway or a vehicle crossway over a sidewalk.</li></ul>",

ticketReason10: "parking too close to a centre line",
checkBylawsPlainLanguageHint10: "You can't park within 3 metres of the road centre line if the road is at least 12 metres wide.",
ticketBylawExplanation10: "<ul>s(16) <li>A vehicle shall not be parked within 3 metres of the centre line of the roadway on a highway where the roadway portion is 12 metres or more in width.</li></ul>",

ticketReason11: "parallel parking more than 500mm from the curb",
checkBylawsPlainLanguageHint11: "If you parallel park you need to be within 500mm from the curb and facing the direction of travel.",
ticketBylawExplanation11: "<ul>s(22) <li>(1) A vehicle parked on a highway shall be parked: <br><br>(a) with: <br><br>(i) the sides of the vehicle parallel to the curb or edge of the roadway, and <br><br>(ii) the right wheels of the vehicle not more than 500 millimetres from the right curb or edge of the roadway, or <br><br>(b) in the case of a one-way highway where parking on either side is permitted, with: <br><br>(i) the sides of the vehicle parallel to the curb or edge of the roadway, <br><br>(ii) the wheels that are the closest to a curb or edge of the roadway not more than 500 millimetres from that curb or edge, and <br><br>(iii) the vehicle facing in the direction of travel authorized for the highway</li></ul>",

ticketReason12: "parking on a sidewalk or boulevard",
checkBylawsPlainLanguageHint12: "You can't park on any part of a sidewalk or boulevard unless a sign states otherwise.",
ticketBylawExplanation12: "<ul>s(4) <li>Unless a traffic control device permits or requires, a vehicle shall not be parked on a sidewalk or boulevard or any part of a sidewalk or boulevard.</li></ul>",

ticketReason13: "parking in a way that caused an obstruction",
checkBylawsPlainLanguageHint13: "You can't park in a way that blocks traffic, a building's doorway, or anywhere an emergency vehicle needs regular access to such as a hospital, police or fire station.",
ticketBylawExplanation13: "<ul>s(15) <li>A vehicle shall not be parked on a highway in a manner that blocks or obstructs: <br><br>(a) the movement of traffic on the highway; <br><br>(b) a doorway to a building; or <br><br>(c) the approach to any fire station, police station, hospital or other place where emergency vehicles require regular access.</li></ul>",

ticketReason14: "parking in a bus zone",
checkBylawsPlainLanguageHint14: "Unless you're a bus you can't park in a bus zone. A taxi can stop 6 metres in front of a bus zone if they are loading/unloading passengers.",
ticketBylawExplanation14: "<ul>s(35) <li>(1) Except as permitted in this section a vehicle shall not be stopped on a highway in any location identified as a bus zone unless the vehicle is a bus.</li><li>(2) A taxi may stop in the forward 6 metres of any bus zone while in the process of actually loading or unloading passengers.</li></ul>",

ticketReason15: "parking in an emergency access zone",
checkBylawsPlainLanguageHint15: "You can't park in a fire lane or any emergency access zone.",
ticketBylawExplanation15: "<ul>s(33) <li>A vehicle shall not be parked on a highway in any location identified as a fire lane, an emergency access zone or otherwise being for the use of emergency vehicles.</li></ul>",

ticketReason16: "parking on a seasonal parking route while a ban was in effect",
checkBylawsPlainLanguageHint16: "You have 8 hours to remove your vehicle from a seasonal parking route once a ban is put in effect.",
ticketBylawExplanation16: "<ul>s(36) <li>(1) A vehicle shall not be parked on a highway in any location identified as a seasonal parking ban route.</li><li>(2) This section only applies when the location identified as a seasonal parking ban route has been designated in effect by the City Manager.</li><li>(3) A vehicle parked on a highway in a location identified as a seasonal parking ban route must be removed from the location identified as a seasonal parking ban route within 8 hours of a seasonal parking route ban having been declared in effect.</li></ul>",

ticketReason17: "parking in a permit zone without a proper permit",
checkBylawsPlainLanguageHint17: "You can't park in a permit zone unless you have a valid permit displayed.",
ticketBylawExplanation17: "<ul>s(37) <li>A vehicle shall not be parked on a highway in any location where a permit to park is required unless a valid and subsisting permit is clearly displayed on the vehicle.</li></ul>",

ticketReason18: "parking in a disabled zone without a permit",
checkBylawsPlainLanguageHint18: "You can't park in a disabled zone unless you are transporting someone with a disability and have a valid permit/license plate.",
ticketBylawExplanation18: "<ul>s(34) <li>A vehicle shall not be parked on a highway in any location identified as being for the use of persons with disabilities unless the vehicle: <br><br>(a) displays a valid disabled placard or license plate issued or recognized by the Registrar; and <br><br>(b) is being used for the transportation of a person with a disability.</li></ul>",

ticketReason19: "parking in a no stopping zone",
checkBylawsPlainLanguageHint19: "Pretty straight forward. You can't stop anywhere designated as a no stopping zone.",
ticketBylawExplanation19: "<ul>s(31) <li>A vehicle shall not be stopped on a highway in any location identified as a zone where stopping is prohibited.</li></ul>",

ticketReason20: "parking in a no parking zone",
checkBylawsPlainLanguageHint20: "No surprises here. You can't park anywhere designated as a no-parking zone.",
ticketBylawExplanation20: "<ul>s(30) <li>A vehicle shall not be parked on a highway in any location identified as a zone where parking is prohibited.</li></ul>",

ticketReason21: "parking in a commercial loading zone",
checkBylawsPlainLanguageHint21: "Unless you're a commerical vehicle, you can't park in a marked commercial loading zone. Commercial vehicles still need to obey any posted time restrictions.",
ticketBylawExplanation21: "<ul>s(28) <li>(1) A vehicle shall not be parked on a highway in any location identified as a commercial loading zone unless the vehicle is a commercial vehicle.</li><li>(2) A vehicle shall not be parked on a highway in any location identified as a commercial loading zone for a period of time longer than that permitted.</li></ul>",

ticketReason22: "parking in a passenger loading zone",
checkBylawsPlainLanguageHint22: "You can't stay in a passenger loading zone longer than signage allows.",
ticketBylawExplanation22: "<ul>s(27) <li>A vehicle shall not be parked on a highway in any location identified as a passenger loading zone for a period of time longer than that permitted.</li.</ul>",

ticketReason23: "parking outside a marked space",
checkBylawsPlainLanguageHint23: "Your vehicle needs to be completely inside the lines when you park in a marked space.",
ticketBylawExplanation23: "<ul>s(14) <li>A vehicle parked on a highway in a location marked by lines or otherwise shall be parked entirely within the markings.</li></ul>",

ticketReason24: "incorrect angle parking",
checkBylawsPlainLanguageHint24: "Looks like if you are angle parking you need to make sure your front wheels are within 500mm of the front of the stall. Motorcyles can have either wheel within 500mm of the front of the stall so long as they are angled in the direction of travel. If your vehicle is more than 5.8 metres long you can't angle park unless you have a permit or there is signage allowing angle parking.",
ticketBylawExplanation24: "<ul>s(23) <li>(1) When: <br><br>(a) a sign indicates that angle parking is permitted or required, and <br><br>(b) parking guide lines are visible on the roadway, a vehicle shall be parked with the vehicle’s sides between and parallel to any two of the guide lines, and <br><br>(c) in the case of a vehicle other than a motor cycle, with one front wheel not more than 500 millimetres from the curb or edge of the roadway, or <br><br>(d) in the case of a motor cycle with: <br><br>(i) a wheel of the motor cycle not more than 500 millimetres from the curb or edge of the roadway and <br><br>(ii) the motor cycle angled in the direction of travel authorized for the traffic lane that is adjacent to the lane on which the motor cycle is parked;</li.><li>(3) A vehicle with a total length exceeding 5.8 metres shall not be parked at an angle on a highway unless: <br><br>(a) a sign specifically permits such parking; or <br><br>(b) the vehicle displays a permit authorizing such parking issued by the City.</li></ul>",

ticketReason25: "leaving my vehicle unattended while on a jack",
checkBylawsPlainLanguageHint25: "You can't leave your vehicle unattended if its on a jack or you are missing a wheel.",
ticketBylawExplanation25: "<ul>s(25) <li>A vehicle shall not be parked and left unattended on a highway if: <br><br>(a) the vehicle is on a jack or a similar device, and <br><br>(b) one or more wheels have been removed from the vehicle or part of the vehicle is raised.</li></ul>",

ticketReason26: "parking a vehicle that was more than 12.5 metres long",
checkBylawsPlainLanguageHint26: "Unless you have a recreational vehicle or are loading/unloading a commercial vehicle with hazard lights on, you can't park a vehicle longer than 12.5 metres (including trailers) next to residential property. Public roads not adjacent to residential property should be ok unless it is between 7pm-7am.",
ticketBylawExplanation26: "<ul>s(17) <li>(1) A vehicle, or a vehicle with a trailer attached, with a total length exceeding 12.5 metres shall not be parked on a highway: <br><br>(a) in a location adjoining residential property at any time; or <br><br>(b) in a location not adjoining residential property at anytime after 7:00 p.m. and before 7:00 a.m.</li><li>(2) This section does not apply if the vehicle: <br><br>(a) is a recreational vehicle; or <br><br>(b) is a commercial vehicle with the hazard warning lamps alight and in the process of loading or unloading goods.</li></ul>",

ticketReason27: "parking a vehicle in the same location for more than 72 hrs",
checkBylawsPlainLanguageHint27: "A vehicle is considered abandoned if it's left parked for 72 hrs.",
ticketBylawExplanation28: "<ul>s(26) <li>(1) A vehicle shall not be abandoned on a highway.</li><li>(2) Without restricting the generality of subsection (1) a vehicle that is left standing in one location on a highway for more than 72 consecutive hours is deemed to have been abandoned at that location.</li></ul>",

ticketReason28: "incorrectly parking a recreational vehicle on a public road",
checkBylawsPlainLanguageHint28: "You can't park a recreational vehicle on the road unless it's completely adjoining the owner's residence (aka is parked next to your property only) and isn't left for more than 72 hrs. You also need to wait at least 48hrs before re-parking in the same spot.",
ticketBylawExplanation28: "<ul>s(19) <li>(1) A recreational vehicle shall not be parked on a highway unless it is parked in a location completely adjoining the recreational vehicle owner’s residence as shown in the records of the Motor Vehicle Registry.</li><li>(2) A recreational vehicle parked pursuant to this section: <br><br>(a) shall not be parked for more than 72 consecutive hours; and <br><br>(b) shall be removed to an off-highway location for at least 48 consecutive hours before it may be parked again on a highway.</li></ul>",

ticketReason29: "parking in an alley",
checkBylawsPlainLanguageHint29: "You can't park in an alley unless a sign states otherwise or are a commercial vehicle loading/unloading with your hazard lights on and don't take longer than 30 min. No vehicle is allowed to block an alley.",
ticketBylawExplanation: "<ul>s(12) <li>(1) A vehicle shall not be parked in an alley unless:<br><br>(a) a traffic control device permits such parking; or <br><br>(b) the vehicle is a commercial vehicle with hazard warning lights alight and in the process of loading or unloading goods.</li><li>(2) Notwithstanding subsection (1)(b) a commercial vehicle shall not be parked in an alley for more than 30 minutes.</li><li>(3) Nothing in this section permits a person to park a vehicle in an alley in a manner that blocks or obstructs the movement of traffic.</li></ul>",

ticketReason30: "double parking next to another vehicle",
checkBylawsPlainLanguageHint30: "You can't double park next to a vehicle unless a sign states otherwise.",
ticketBylawExplanation30: "<ul>s(10) <li>Unless a traffic control device permits or requires, a vehicle shall not be parked on the roadway side of a vehicle that is parked at the curb or edge of the roadway.</li></ul>",

ticketReason31: "parking in a bridge or tunnel",
checkBylawsPlainLanguageHint31: "You can't park in, or on the approach to, a bridge or tunnel unless a sign states otherwise.",
ticketBylawExplanation31: "<ul>s(9) <li>Unless a traffic control device permits or requires, a vehicle shall not be parked on any bridge or in any tunnel or on any approach to either of them.</li></ul>",

ticketReason32: "parking an unattached trailer",
checkBylawsPlainLanguageHint32: "You can't leave trailers unattached. Trailers need to be attached to a vehicle capable of towing it.",
ticketBylawExplanation: "<ul>s(20) <li>Notwithstanding any other provision of this bylaw, a trailer shall not be parked on a highway unless the trailer is attached to a vehicle by which it may be drawn.</li></ul>",

ticketReason33: "pay and display zone violation",
checkBylawsPlainLanguageHint33: "You need to have a valid ticket or permit displayed while you're in an active pay and display zone. These rules don't apply during the zone's off hours.",
ticketBylawExplanation33: "<ul>s(45) <li>(1) A vehicle shall not be parked on a highway in any space identified as a pay and display zone unless there is unexpired time remaining on a ticket issued by a pay and display machine.</li><li>(2) A vehicle shall not be parked on a highway in any space identified as a pay and display zone unless there is a ticket issued by a pay and display machine displayed face up in a clearly visible location on the dashboard of the vehicle.</li><li>(3) This section is only in effect on the days and during the times a pay and display zone is identified as being in effect.</li><li>(4) This section does not apply to a vehicle displaying a valid permit issued by the City for pay and display zone parking so long as all conditions of the permit are satisfied.</li></ul>",

ticketReason34: "EPark zone violation",
checkBylawsPlainLanguageHint34: "Looks like you can't exceed the paid time remaining as displayed on the traffic control device unless signage indicates off-hours. If your license plate is absent or incorrectly recorded into the EPark device, the court will consider payment was not made unless you are able to prove otherwise.",
ticketBylawExplanation34: "<ul>s(38.1) <li>(1) A vehicle shall not be parked in an EPark zone: <br><br>(a) for a period of time in excess of the time limit indicated on a traffic control device; <br><br>(b) unless the full amount of the required payment for that EPark zone has been made in accordance with the instructions on a traffic control device; or <br><br>(c) contrary to any other restriction on a traffic control device.</li><li>(2) In a prosecution under this section, where a certified copy of a record of the City containing licence plate and payment information for an EPark zone from the time of the alleged offence is tendered: <br><br>(a) the Court may conclude that, in the absence of licence plate information being found in the record, the required payment has not been made in relation to the vehicle to which that licence plate corresponds; and <br>(b) where the licence plate information of a vehicle is absent from the record, the onus of proving a person has made the required payment in relation to that vehicle shall be on the person alleging the required payment has been made on a balance of probabilities</li></ul>",

ticketReason35: "parking bylaw not found",
checkBylawsPlainLanguageHint35: "",
ticketBylawExplanation35: "Sorry, I couldn't find the bylaw for this situation :("
};

export {checkBylawsOutputTemplate, cityBylawLink, cityBylawName, bylawTextObj};
