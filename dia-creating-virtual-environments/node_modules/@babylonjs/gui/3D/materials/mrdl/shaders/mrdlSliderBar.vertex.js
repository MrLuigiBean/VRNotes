// Do not edit.
import { ShaderStore } from "@babylonjs/core/Engines/shaderStore.js";
const name = "mrdlSliderBarVertexShader";
const shader = `uniform mat4 world;uniform mat4 viewProjection;uniform vec3 cameraPosition;attribute vec3 position;attribute vec3 normal;attribute vec2 uv;
#ifdef TANGENT
attribute vec3 tangent;
#else
const vec3 tangent=vec3(0.);
#endif
uniform float _Radius_;uniform float _Bevel_Front_;uniform float _Bevel_Front_Stretch_;uniform float _Bevel_Back_;uniform float _Bevel_Back_Stretch_;uniform float _Radius_Top_Left_;uniform float _Radius_Top_Right_;uniform float _Radius_Bottom_Left_;uniform float _Radius_Bottom_Right_;uniform bool _Bulge_Enabled_;uniform float _Bulge_Height_;uniform float _Bulge_Radius_;uniform float _Sun_Intensity_;uniform float _Sun_Theta_;uniform float _Sun_Phi_;uniform float _Indirect_Diffuse_;uniform vec4 _Albedo_;uniform float _Specular_;uniform float _Shininess_;uniform float _Sharpness_;uniform float _Subsurface_;uniform vec4 _Left_Color_;uniform vec4 _Right_Color_;uniform float _Reflection_;uniform float _Front_Reflect_;uniform float _Edge_Reflect_;uniform float _Power_;uniform vec4 _Sky_Color_;uniform vec4 _Horizon_Color_;uniform vec4 _Ground_Color_;uniform float _Horizon_Power_;uniform sampler2D _Reflection_Map_;uniform sampler2D _Indirect_Environment_;uniform float _Width_;uniform float _Fuzz_;uniform float _Min_Fuzz_;uniform float _Clip_Fade_;uniform float _Hue_Shift_;uniform float _Saturation_Shift_;uniform float _Value_Shift_;uniform vec3 _Blob_Position_;uniform float _Blob_Intensity_;uniform float _Blob_Near_Size_;uniform float _Blob_Far_Size_;uniform float _Blob_Near_Distance_;uniform float _Blob_Far_Distance_;uniform float _Blob_Fade_Length_;uniform float _Blob_Pulse_;uniform float _Blob_Fade_;uniform sampler2D _Blob_Texture_;uniform vec3 _Blob_Position_2_;uniform float _Blob_Near_Size_2_;uniform float _Blob_Pulse_2_;uniform float _Blob_Fade_2_;uniform vec3 _Left_Index_Pos_;uniform vec3 _Right_Index_Pos_;uniform vec3 _Left_Index_Middle_Pos_;uniform vec3 _Right_Index_Middle_Pos_;uniform sampler2D _Decal_;uniform vec2 _Decal_Scale_XY_;uniform bool _Decal_Front_Only_;uniform float _Rim_Intensity_;uniform sampler2D _Rim_Texture_;uniform float _Rim_Hue_Shift_;uniform float _Rim_Saturation_Shift_;uniform float _Rim_Value_Shift_;uniform float _Iridescence_Intensity_;uniform sampler2D _Iridescence_Texture_;uniform bool Use_Global_Left_Index;uniform bool Use_Global_Right_Index;uniform vec4 Global_Left_Index_Tip_Position;uniform vec4 Global_Right_Index_Tip_Position;uniform vec4 Global_Left_Thumb_Tip_Position;uniform vec4 Global_Right_Thumb_Tip_Position;uniform float Global_Left_Index_Tip_Proximity;uniform float Global_Right_Index_Tip_Proximity;varying vec3 vPosition;varying vec3 vNormal;varying vec2 vUV;varying vec3 vTangent;varying vec3 vBinormal;varying vec4 vColor;varying vec4 vExtra1;varying vec4 vExtra2;varying vec4 vExtra3;void Object_To_World_Pos_B12(
vec3 Pos_Object,
out vec3 Pos_World)
{Pos_World=(world*vec4(Pos_Object,1.0)).xyz;}
void Object_To_World_Normal_B32(
vec3 Nrm_Object,
out vec3 Nrm_World)
{Nrm_World=(vec4(Nrm_Object,0.0)).xyz;}
void Blob_Vertex_B23(
vec3 Position,
vec3 Normal,
vec3 Tangent,
vec3 Bitangent,
vec3 Blob_Position,
float Intensity,
float Blob_Near_Size,
float Blob_Far_Size,
float Blob_Near_Distance,
float Blob_Far_Distance,
float Blob_Fade_Length,
float Blob_Pulse,
float Blob_Fade,
out vec4 Blob_Info)
{vec3 blob= (Use_Global_Left_Index ? Global_Left_Index_Tip_Position.xyz : Blob_Position);vec3 delta=blob-Position;float dist=dot(Normal,delta);float lerpValue=clamp((abs(dist)-Blob_Near_Distance)/(Blob_Far_Distance-Blob_Near_Distance),0.0,1.0);float fadeValue=1.0-clamp((abs(dist)-Blob_Far_Distance)/Blob_Fade_Length,0.0,1.0);float size=Blob_Near_Size+(Blob_Far_Size-Blob_Near_Size)*lerpValue;vec2 blobXY=vec2(dot(delta,Tangent),dot(delta,Bitangent))/(0.0001+size);float Fade=fadeValue*Intensity*Blob_Fade;float Distance=(lerpValue*0.5+0.5)*(1.0-Blob_Pulse);Blob_Info=vec4(blobXY.x,blobXY.y,Distance,Fade);}
void Blob_Vertex_B24(
vec3 Position,
vec3 Normal,
vec3 Tangent,
vec3 Bitangent,
vec3 Blob_Position,
float Intensity,
float Blob_Near_Size,
float Blob_Far_Size,
float Blob_Near_Distance,
float Blob_Far_Distance,
float Blob_Fade_Length,
float Blob_Pulse,
float Blob_Fade,
out vec4 Blob_Info)
{vec3 blob= (Use_Global_Right_Index ? Global_Right_Index_Tip_Position.xyz : Blob_Position);vec3 delta=blob-Position;float dist=dot(Normal,delta);float lerpValue=clamp((abs(dist)-Blob_Near_Distance)/(Blob_Far_Distance-Blob_Near_Distance),0.0,1.0);float fadeValue=1.0-clamp((abs(dist)-Blob_Far_Distance)/Blob_Fade_Length,0.0,1.0);float size=Blob_Near_Size+(Blob_Far_Size-Blob_Near_Size)*lerpValue;vec2 blobXY=vec2(dot(delta,Tangent),dot(delta,Bitangent))/(0.0001+size);float Fade=fadeValue*Intensity*Blob_Fade;float Distance=(lerpValue*0.5+0.5)*(1.0-Blob_Pulse);Blob_Info=vec4(blobXY.x,blobXY.y,Distance,Fade);}
void Move_Verts_B130(
float Anisotropy,
vec3 P,
float Radius,
float Bevel,
vec3 Normal_Object,
float ScaleZ,
float Stretch,
out vec3 New_P,
out vec2 New_UV,
out float Radial_Gradient,
out vec3 Radial_Dir,
out vec3 New_Normal)
{vec2 UV=P.xy*2.0+0.5;vec2 center=clamp(UV,0.0,1.0);vec2 delta=UV-center;float deltad=(length(delta)*2.0);float f=(Bevel+(Radius-Bevel)*Stretch)/Radius;float innerd=clamp(deltad*2.0,0.0,1.0);float outerd=clamp(deltad*2.0-1.0,0.0,1.0);float bevelAngle=outerd*3.14159*0.5;float sinb=sin(bevelAngle);float cosb=cos(bevelAngle);float beveld=(1.0-f)*innerd+f*sinb;float br=outerd;vec2 r2=2.0*vec2(Radius/Anisotropy,Radius);float dir=P.z<0.0001 ? 1.0 : -1.0;New_UV=center+r2*((0.5-center)+normalize(delta+vec2(0.0,0.000001))*beveld*0.5);New_P=vec3(New_UV-0.5,P.z+dir*(1.0-cosb)*Bevel*ScaleZ);Radial_Gradient=clamp((deltad-0.5)*2.0,0.0,1.0);Radial_Dir=vec3(delta*r2,0.0);vec3 beveledNormal=cosb*Normal_Object+sinb*vec3(delta.x,delta.y,0.0);New_Normal=Normal_Object.z==0.0 ? Normal_Object : beveledNormal;}
void Object_To_World_Dir_B60(
vec3 Dir_Object,
out vec3 Normal_World,
out vec3 Normal_World_N,
out float Normal_Length)
{Normal_World=(world*vec4(Dir_Object,0.0)).xyz;Normal_Length=length(Normal_World);Normal_World_N=Normal_World/Normal_Length;}
void To_XYZ_B78(
vec3 Vec3,
out float X,
out float Y,
out float Z)
{X=Vec3.x;Y=Vec3.y;Z=Vec3.z;}
void Conditional_Float_B93(
bool Which,
float If_True,
float If_False,
out float Result)
{Result=Which ? If_True : If_False;}
void Object_To_World_Dir_B28(
vec3 Dir_Object,
out vec3 Binormal_World,
out vec3 Binormal_World_N,
out float Binormal_Length)
{Binormal_World=(world*vec4(Dir_Object,0.0)).xyz;Binormal_Length=length(Binormal_World);Binormal_World_N=Binormal_World/Binormal_Length;}
void Pick_Radius_B69(
float Radius,
float Radius_Top_Left,
float Radius_Top_Right,
float Radius_Bottom_Left,
float Radius_Bottom_Right,
vec3 Position,
out float Result)
{bool whichY=Position.y>0.0;Result=Position.x<0.0 ? (whichY ? Radius_Top_Left : Radius_Bottom_Left) : (whichY ? Radius_Top_Right : Radius_Bottom_Right);Result*=Radius;}
void Conditional_Float_B36(
bool Which,
float If_True,
float If_False,
out float Result)
{Result=Which ? If_True : If_False;}
void Greater_Than_B37(
float Left,
float Right,
out bool Not_Greater_Than,
out bool Greater_Than)
{Greater_Than=Left>Right;Not_Greater_Than=!Greater_Than;}
void Remap_Range_B105(
float In_Min,
float In_Max,
float Out_Min,
float Out_Max,
float In,
out float Out)
{Out=mix(Out_Min,Out_Max,clamp((In-In_Min)/(In_Max-In_Min),0.0,1.0));}
void main()
{vec2 XY_Q85;XY_Q85=(uv-vec2(0.5,0.5))*_Decal_Scale_XY_+vec2(0.5,0.5);vec3 Tangent_World_Q27;vec3 Tangent_World_N_Q27;float Tangent_Length_Q27;Tangent_World_Q27=(world*vec4(vec3(1,0,0),0.0)).xyz;Tangent_Length_Q27=length(Tangent_World_Q27);Tangent_World_N_Q27=Tangent_World_Q27/Tangent_Length_Q27;vec3 Normal_World_Q60;vec3 Normal_World_N_Q60;float Normal_Length_Q60;Object_To_World_Dir_B60(vec3(0,0,1),Normal_World_Q60,Normal_World_N_Q60,Normal_Length_Q60);float X_Q78;float Y_Q78;float Z_Q78;To_XYZ_B78(position,X_Q78,Y_Q78,Z_Q78);vec3 Nrm_World_Q26;Nrm_World_Q26=normalize((world*vec4(normal,0.0)).xyz);vec3 Binormal_World_Q28;vec3 Binormal_World_N_Q28;float Binormal_Length_Q28;Object_To_World_Dir_B28(vec3(0,1,0),Binormal_World_Q28,Binormal_World_N_Q28,Binormal_Length_Q28);float Anisotropy_Q29=Tangent_Length_Q27/Binormal_Length_Q28;float Result_Q69;Pick_Radius_B69(_Radius_,_Radius_Top_Left_,_Radius_Top_Right_,_Radius_Bottom_Left_,_Radius_Bottom_Right_,position,Result_Q69);float Anisotropy_Q53=Binormal_Length_Q28/Normal_Length_Q60;bool Not_Greater_Than_Q37;bool Greater_Than_Q37;Greater_Than_B37(Z_Q78,0.0,Not_Greater_Than_Q37,Greater_Than_Q37);vec4 Linear_Q101;Linear_Q101.rgb=clamp(_Left_Color_.rgb*_Left_Color_.rgb,0.0,1.0);Linear_Q101.a=_Left_Color_.a;vec4 Linear_Q102;Linear_Q102.rgb=clamp(_Right_Color_.rgb*_Right_Color_.rgb,0.0,1.0);Linear_Q102.a=_Right_Color_.a;vec3 Difference_Q61=vec3(0,0,0)-Normal_World_N_Q60;vec4 Out_Color_Q34=vec4(X_Q78,Y_Q78,Z_Q78,1);float Result_Q36;Conditional_Float_B36(Greater_Than_Q37,_Bevel_Back_,_Bevel_Front_,Result_Q36);float Result_Q94;Conditional_Float_B36(Greater_Than_Q37,_Bevel_Back_Stretch_,_Bevel_Front_Stretch_,Result_Q94);vec3 New_P_Q130;vec2 New_UV_Q130;float Radial_Gradient_Q130;vec3 Radial_Dir_Q130;vec3 New_Normal_Q130;Move_Verts_B130(Anisotropy_Q29,position,Result_Q69,Result_Q36,normal,Anisotropy_Q53,Result_Q94,New_P_Q130,New_UV_Q130,Radial_Gradient_Q130,Radial_Dir_Q130,New_Normal_Q130);float X_Q98;float Y_Q98;X_Q98=New_UV_Q130.x;Y_Q98=New_UV_Q130.y;vec3 Pos_World_Q12;Object_To_World_Pos_B12(New_P_Q130,Pos_World_Q12);vec3 Nrm_World_Q32;Object_To_World_Normal_B32(New_Normal_Q130,Nrm_World_Q32);vec4 Blob_Info_Q23;
#if BLOB_ENABLE
Blob_Vertex_B23(Pos_World_Q12,Nrm_World_Q26,Tangent_World_N_Q27,Binormal_World_N_Q28,_Blob_Position_,_Blob_Intensity_,_Blob_Near_Size_,_Blob_Far_Size_,_Blob_Near_Distance_,_Blob_Far_Distance_,_Blob_Fade_Length_,_Blob_Pulse_,_Blob_Fade_,Blob_Info_Q23);
#else
Blob_Info_Q23=vec4(0,0,0,0);
#endif
vec4 Blob_Info_Q24;
#if BLOB_ENABLE_2
Blob_Vertex_B24(Pos_World_Q12,Nrm_World_Q26,Tangent_World_N_Q27,Binormal_World_N_Q28,_Blob_Position_2_,_Blob_Intensity_,_Blob_Near_Size_2_,_Blob_Far_Size_,_Blob_Near_Distance_,_Blob_Far_Distance_,_Blob_Fade_Length_,_Blob_Pulse_2_,_Blob_Fade_2_,Blob_Info_Q24);
#else
Blob_Info_Q24=vec4(0,0,0,0);
#endif
float Out_Q105;Remap_Range_B105(0.0,1.0,0.0,1.0,X_Q98,Out_Q105);float X_Q86;float Y_Q86;float Z_Q86;To_XYZ_B78(Nrm_World_Q32,X_Q86,Y_Q86,Z_Q86);vec4 Color_At_T_Q97=mix(Linear_Q101,Linear_Q102,Out_Q105);float Minus_F_Q87=-Z_Q86;float R_Q99;float G_Q99;float B_Q99;float A_Q99;R_Q99=Color_At_T_Q97.r; G_Q99=Color_At_T_Q97.g; B_Q99=Color_At_T_Q97.b; A_Q99=Color_At_T_Q97.a;float ClampF_Q88=clamp(0.0,Minus_F_Q87,1.0);float Result_Q93;Conditional_Float_B93(_Decal_Front_Only_,ClampF_Q88,1.0,Result_Q93);vec4 Vec4_Q89=vec4(Result_Q93,Radial_Gradient_Q130,G_Q99,B_Q99);vec3 Position=Pos_World_Q12;vec3 Normal=Nrm_World_Q32;vec2 UV=XY_Q85;vec3 Tangent=Tangent_World_N_Q27;vec3 Binormal=Difference_Q61;vec4 Color=Out_Color_Q34;vec4 Extra1=Vec4_Q89;vec4 Extra2=Blob_Info_Q23;vec4 Extra3=Blob_Info_Q24;gl_Position=viewProjection*vec4(Position,1);vPosition=Position;vNormal=Normal;vUV=UV;vTangent=Tangent;vBinormal=Binormal;vColor=Color;vExtra1=Extra1;vExtra2=Extra2;vExtra3=Extra3;}`;
// Sideeffect
ShaderStore.ShadersStore[name] = shader;
/** @internal */
export const mrdlSliderBarVertexShader = { name, shader };
//# sourceMappingURL=mrdlSliderBar.vertex.js.map