# Week 1 (What is AR, VR, XR)
https://youtu.be/zNpo3Ue2Ui0

AR - A digital overlay over reality (AR glasses; Google glass, Pokemon go),
VR - Everything you see is Virtual (Quest, PSVR),
MR - Able to take into account the physical environment to simulate virtual objects (Holo lens, Apple vision pro),
XR - A umbrella term for these experiences

RV Continuum, Reality-Virtuality Continuum; How Virtual the environment is
1. Extent of World knowledge; Real world unmodified -> Real world Completely modified
2. Immersion; No virtual content -> System supports every possible action
3. Coherence; No virtual content -> Every virtual behavior is plausible
   
E.g Strava is very close to reality but not fully reality as it has some extent of real world knowledge that is being modelled in the app (running routes)

Extent of world knowledge: Virtual objects are able to interact with real world objects,

Reproduction Fidelity: How real/high quality the images and models are,

Extent of Presence: How much of your senses are being emulated

Coherence: How immersive/believable the experience is,

History of VR - first VR device invented earlier that 21 Century, Oculus Rift DK1 sparked the current rise of VR.

# Week 2
https://youtu.be/iDCnmggNIy8

Immersion from systems and experiential perspective,
systems: Hardware of virtual device or qualities of the software like the visual fidelity, AI-driven characters and controls,
Experiential: User experience of software such as Presence, flow, cyber-sickness.

Research data:
Experiential constructs: Feeling of the users (e.g Cybersickness).
Quantitative data: what data is being collected that can be "measured" (e.g Physiological measures).
Qualitative data: can be observed and recorded, collected through observations and surveys.

Best type of data for research: Validated Questionnaires

Cyber sickness:
Symptoms of sickness due to cyber activities.
nausea, dizziness, disorientation, and other discomforts.
measured using validated Questionnaires.
SSQ, CSQ, VRSQ.

SSQ -> oldest from of cyber sickness questionnaire has data but not related to VR.

for VR CSQ, and VRSQ can be used to compare results
# Week 4
https://youtu.be/qxNUQVsZ9Rk
	
debug.message found in command prompt or browser's javascript console,

createScene is defined in app.ts,

adding a custom script to the project -> package.json,

project dependencies version -> package-lock.json,

Development tools:
Unity3D, Unreal Engine
BabylonJS (WebXR)
A-Frame (WebXR)
ThreeJS

Co-Spaces - Easy to learn but very limiting,
OpenXR - SDK in C++ strong and powerful but hard to learn,
WebXR - More accessibility for users and devs, immersion limited to the system.
# Week 5
https://youtu.be/OKD4jrnn4WE

**Hardware components**

What is the image formation process in typical XR HMDs

Main difference of hardware between smartphone and HMD: Magnifier lens.

in HMD, where is the eye relief: Distance between eye and lens.

The width of the virtual image is the width of the projected image in virtual space.

What will changing the focal length do: Changes the depth of the virtual image generated.

Perspective and View matrix for both eyes are different as both eyes have different positions.

In the View Frustum, Volume is only vertically symmetric.

Frustum is split in to nasal and temporal FOVs.

Binocular FOV is the combined visual span of the overlapping nasal FOV views.

Monocular FOV is the combined visual span of the temporal FOVs.

Rendered view has distortion correction to counter natural distortions caused by the curved lens.

Chromatic aberrations are also caused by lens and lights are refracted differently through the lens.
# Week 6
https://youtu.be/9crXku_K-0Y

Creating Skybox, The box the player will be seeing is facing inwards, therefore need to turn off backface culling

Debug layer provides a UI interface to inspect and manipulate scene during runtime

**Model vs image base approach**

Model based approach are more interactive, with physics and collision being important to the experience.

Image based approach are more of a story telling medium, a walkthrough of an experience with limited intractability. 
