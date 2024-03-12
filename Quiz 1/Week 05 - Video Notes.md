
# Hardware and Software Components
[Discussion Link](https://github.com/orgs/sit-dia/discussions/9)
## 1. Variety of XR Devices
- XR = eXtended Reality, the intersection of the 3 sets AR, VR & MR
- Common dedicated XR Devices: Meta Quest series, HTC Vive, Microsoft Hololens

## 2. The HMD
- HMD = Head Mounted Device
- Were originally only meant for VR
- Can be used with PCs (PCVR) or standalone (All In One VR -> AIO)
- AR HMDs: Smartphones, Smartglasses

## 3. Hardware Components
- Meta Quest 2
	- Display Screen
	- 2x Magnifier Glasses
	- Optional Corrective lenses (so that wearing typical glasses is not necessary)
	- Specialised controllers, with infrared lights and motion tracking
	- Motion tracking in the main headset
	- Cameras all over the headset
	- Misc: Battery, speakers, CPU, GPU, motherboard (very similar to smartphone components)

## 4. Image Formation Process
### Side View
![Side view](https://github.com/MrLuigiBean/VRNotes/assets/84760999/ad415420-2842-4822-8a00-58f025338c2b)

- `h_disp` = height of the display (basically the width of a smartphone screen, since it is in a landscape orientation, not portrait)
- `d_disp` = distance between display and lens
- `f` = focal length of lens
- `d_eye` = eye relief (distance between eyes to the lens)
- From the Gaussian Thin Lens formula, 
	- `d_virt` = distance from lens to virtual image, calculated by `d_disp`, `f`
	- `h_virt` = height of virtual image, calculated by `h_disp`, `d_disp`, `f`
	- View frustum (near is the display, far is the virtual image) is _vertically symmetric_

### Top View
![Top View](https://github.com/MrLuigiBean/VRNotes/assets/84760999/d1e26f04-33c1-408e-a97f-14224bb2a770)

- `w_disp` = width of the display (basically the height of a smartphone screen, since it is in a landscape orientation, not portrait)
- `w_ipd` = interpupillary distance (distance between eyes/lenses)
- `w_virt1` = left width of virtual image, calculated by `w_disp`, `d_virt`, `w_ipd`
- `w_virt2` = right width of virtual image, calculated by `w_disp`, `d_virt`, `w_ipd`
- For the left eye, `w_virt1` > `w_virt2`. Vice-versa for the right eye.
- View frustum (near is the display, far is the virtual image) is _horizontally **asymmetric**_ -> different images for the left and right eyes

### Field Of View (FOV)
Side FOV
![Side FOV](https://github.com/MrLuigiBean/VRNotes/assets/84760999/53f28ce5-aeb0-4829-9646-6c998584a57e)

Top FOV
![Top FOV](https://github.com/MrLuigiBean/VRNotes/assets/84760999/2fe92014-3f92-4ffc-95fd-23c7d79d4fa6)


- `d` = distance from eye to virtual image
- `h` = height of virtual image
- `fov_h` = horizontal FOV angle, calculated by `fov_h_nasal` and `fov_h_temporal`, which use`w_ipd`, `d`
- `fov_h_nasal` = the FOV angle of the nose side
- `fov_h_temporal` = the FOV angle of the side of the temples
- `fov_v` = vertical FOV angle, calculated by `h`, `d`, `M`
- `M` = magnification factor (refer to slides for more context)

#### Types of FOV
- Binocular FOV: the combined visual span of **overlapping** region of both eyes
- Monocular FOV: the combined visual span of **non-overlapping** region of both eyes (the parts separately seen by each eye, peripheral vision)

## 5. Software Components
- Rendering
	- Helps produce the stereo images necessary
	- Need to manage 3D models and their textures
	- Lighting
	- Camera (User Viewpoint)
	- Post Processing (Bloom, Depth of Field)
- Physics
	- Takes care of how objects are simulated akin to real-life
	- Displacement
	- Velocity
	- Acceleration
	- Gravity
	- Need to specify response behaviours
- Input Handler
	- Manages input based on what hardware is available
	- Captures input events
	- Update positions based on the HMD's position & rotation
- Audio
	- Manages audio files
	- Load files
	- Decode files
	- Volume
	- Pitch
- AI
	- Facilitates the development of automated behaviours in animated objects
	- Level of intelligence to exhibit varies with the use case
	- Pathfinding/Navigation
	- Decision Making Tools (Finite State Machines)
	- Learning Mechanisms
- Networking, etc...

# End

Link: [Developing Immersive Applications: Hardware and Software Components](https://www.youtube.com/watch?v=OKD4jrnn4WE)

> Written with [StackEdit](https://stackedit.io/).
