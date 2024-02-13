/** @internal */
export declare enum PowerPreference {
    LowPower = "low-power",
    HighPerformance = "high-performance"
}
/** @internal */
export declare enum FeatureName {
    DepthClipControl = "depth-clip-control",
    Depth32FloatStencil8 = "depth32float-stencil8",
    TextureCompressionBC = "texture-compression-bc",
    TextureCompressionETC2 = "texture-compression-etc2",
    TextureCompressionASTC = "texture-compression-astc",
    TimestampQuery = "timestamp-query",
    IndirectFirstInstance = "indirect-first-instance",
    ShaderF16 = "shader-f16",
    RG11B10UFloatRenderable = "rg11b10ufloat-renderable",
    BGRA8UnormStorage = "bgra8unorm-storage",
    Float32Filterable = "float32-filterable"
}
/** @internal */
export declare enum BufferMapState {
    Unmapped = "unmapped",
    Pending = "pending",
    Mapped = "mapped"
}
/** @internal */
export declare enum BufferUsage {
    MapRead = 1,
    MapWrite = 2,
    CopySrc = 4,
    CopyDst = 8,
    Index = 16,
    Vertex = 32,
    Uniform = 64,
    Storage = 128,
    Indirect = 256,
    QueryResolve = 512
}
/** @internal */
export declare enum MapMode {
    Read = 1,
    Write = 2
}
/** @internal */
export declare enum TextureDimension {
    E1d = "1d",
    E2d = "2d",
    E3d = "3d"
}
/** @internal */
export declare enum TextureUsage {
    CopySrc = 1,
    CopyDst = 2,
    TextureBinding = 4,
    StorageBinding = 8,
    RenderAttachment = 16
}
/** @internal */
export declare enum TextureViewDimension {
    E1d = "1d",
    E2d = "2d",
    E2dArray = "2d-array",
    Cube = "cube",
    CubeArray = "cube-array",
    E3d = "3d"
}
/** @internal */
export declare enum TextureAspect {
    All = "all",
    StencilOnly = "stencil-only",
    DepthOnly = "depth-only"
}
/**
 * Comments taken from https://github.com/gfx-rs/wgpu/blob/master/wgpu-types/src/lib.rs
 * @internal
 */
export declare enum TextureFormat {
    R8Unorm = "r8unorm",
    R8Snorm = "r8snorm",
    R8Uint = "r8uint",
    R8Sint = "r8sint",
    R16Uint = "r16uint",
    R16Sint = "r16sint",
    R16Float = "r16float",
    RG8Unorm = "rg8unorm",
    RG8Snorm = "rg8snorm",
    RG8Uint = "rg8uint",
    RG8Sint = "rg8sint",
    R32Uint = "r32uint",
    R32Sint = "r32sint",
    R32Float = "r32float",
    RG16Uint = "rg16uint",
    RG16Sint = "rg16sint",
    RG16Float = "rg16float",
    RGBA8Unorm = "rgba8unorm",
    RGBA8UnormSRGB = "rgba8unorm-srgb",
    RGBA8Snorm = "rgba8snorm",
    RGBA8Uint = "rgba8uint",
    RGBA8Sint = "rgba8sint",
    BGRA8Unorm = "bgra8unorm",
    BGRA8UnormSRGB = "bgra8unorm-srgb",
    RGB9E5UFloat = "rgb9e5ufloat",
    RGB10A2UINT = "rgb10a2uint",
    RGB10A2Unorm = "rgb10a2unorm",
    RG11B10UFloat = "rg11b10ufloat",
    RG32Uint = "rg32uint",
    RG32Sint = "rg32sint",
    RG32Float = "rg32float",
    RGBA16Uint = "rgba16uint",
    RGBA16Sint = "rgba16sint",
    RGBA16Float = "rgba16float",
    RGBA32Uint = "rgba32uint",
    RGBA32Sint = "rgba32sint",
    RGBA32Float = "rgba32float",
    Stencil8 = "stencil8",
    Depth16Unorm = "depth16unorm",
    Depth24Plus = "depth24plus",
    Depth24PlusStencil8 = "depth24plus-stencil8",
    Depth32Float = "depth32float",
    BC1RGBAUnorm = "bc1-rgba-unorm",
    BC1RGBAUnormSRGB = "bc1-rgba-unorm-srgb",
    BC2RGBAUnorm = "bc2-rgba-unorm",
    BC2RGBAUnormSRGB = "bc2-rgba-unorm-srgb",
    BC3RGBAUnorm = "bc3-rgba-unorm",
    BC3RGBAUnormSRGB = "bc3-rgba-unorm-srgb",
    BC4RUnorm = "bc4-r-unorm",
    BC4RSnorm = "bc4-r-snorm",
    BC5RGUnorm = "bc5-rg-unorm",
    BC5RGSnorm = "bc5-rg-snorm",
    BC6HRGBUFloat = "bc6h-rgb-ufloat",
    BC6HRGBFloat = "bc6h-rgb-float",
    BC7RGBAUnorm = "bc7-rgba-unorm",
    BC7RGBAUnormSRGB = "bc7-rgba-unorm-srgb",
    ETC2RGB8Unorm = "etc2-rgb8unorm",
    ETC2RGB8UnormSRGB = "etc2-rgb8unorm-srgb",
    ETC2RGB8A1Unorm = "etc2-rgb8a1unorm",
    ETC2RGB8A1UnormSRGB = "etc2-rgb8a1unorm-srgb",
    ETC2RGBA8Unorm = "etc2-rgba8unorm",
    ETC2RGBA8UnormSRGB = "etc2-rgba8unorm-srgb",
    EACR11Unorm = "eac-r11unorm",
    EACR11Snorm = "eac-r11snorm",
    EACRG11Unorm = "eac-rg11unorm",
    EACRG11Snorm = "eac-rg11snorm",
    ASTC4x4Unorm = "astc-4x4-unorm",
    ASTC4x4UnormSRGB = "astc-4x4-unorm-srgb",
    ASTC5x4Unorm = "astc-5x4-unorm",
    ASTC5x4UnormSRGB = "astc-5x4-unorm-srgb",
    ASTC5x5Unorm = "astc-5x5-unorm",
    ASTC5x5UnormSRGB = "astc-5x5-unorm-srgb",
    ASTC6x5Unorm = "astc-6x5-unorm",
    ASTC6x5UnormSRGB = "astc-6x5-unorm-srgb",
    ASTC6x6Unorm = "astc-6x6-unorm",
    ASTC6x6UnormSRGB = "astc-6x6-unorm-srgb",
    ASTC8x5Unorm = "astc-8x5-unorm",
    ASTC8x5UnormSRGB = "astc-8x5-unorm-srgb",
    ASTC8x6Unorm = "astc-8x6-unorm",
    ASTC8x6UnormSRGB = "astc-8x6-unorm-srgb",
    ASTC8x8Unorm = "astc-8x8-unorm",
    ASTC8x8UnormSRGB = "astc-8x8-unorm-srgb",
    ASTC10x5Unorm = "astc-10x5-unorm",
    ASTC10x5UnormSRGB = "astc-10x5-unorm-srgb",
    ASTC10x6Unorm = "astc-10x6-unorm",
    ASTC10x6UnormSRGB = "astc-10x6-unorm-srgb",
    ASTC10x8Unorm = "astc-10x8-unorm",
    ASTC10x8UnormSRGB = "astc-10x8-unorm-srgb",
    ASTC10x10Unorm = "astc-10x10-unorm",
    ASTC10x10UnormSRGB = "astc-10x10-unorm-srgb",
    ASTC12x10Unorm = "astc-12x10-unorm",
    ASTC12x10UnormSRGB = "astc-12x10-unorm-srgb",
    ASTC12x12Unorm = "astc-12x12-unorm",
    ASTC12x12UnormSRGB = "astc-12x12-unorm-srgb",
    Depth32FloatStencil8 = "depth32float-stencil8"
}
/** @internal */
export declare enum AddressMode {
    ClampToEdge = "clamp-to-edge",
    Repeat = "repeat",
    MirrorRepeat = "mirror-repeat"
}
/** @internal */
export declare enum FilterMode {
    Nearest = "nearest",
    Linear = "linear"
}
/** @internal */
export declare enum MipmapFilterMode {
    Nearest = "nearest",
    Linear = "linear"
}
/** @internal */
export declare enum CompareFunction {
    Never = "never",
    Less = "less",
    Equal = "equal",
    LessEqual = "less-equal",
    Greater = "greater",
    NotEqual = "not-equal",
    GreaterEqual = "greater-equal",
    Always = "always"
}
/** @internal */
export declare enum ShaderStage {
    Vertex = 1,
    Fragment = 2,
    Compute = 4
}
/** @internal */
export declare enum BufferBindingType {
    Uniform = "uniform",
    Storage = "storage",
    ReadOnlyStorage = "read-only-storage"
}
/** @internal */
export declare enum SamplerBindingType {
    Filtering = "filtering",
    NonFiltering = "non-filtering",
    Comparison = "comparison"
}
/** @internal */
export declare enum TextureSampleType {
    Float = "float",
    UnfilterableFloat = "unfilterable-float",
    Depth = "depth",
    Sint = "sint",
    Uint = "uint"
}
/** @internal */
export declare enum StorageTextureAccess {
    WriteOnly = "write-only",
    ReadOnly = "read-only",
    ReadWrite = "read-write"
}
/** @internal */
export declare enum CompilationMessageType {
    Error = "error",
    Warning = "warning",
    Info = "info"
}
/** @internal */
export declare enum PipelineErrorReason {
    Validation = "validation",
    Internal = "internal"
}
/** @internal */
export declare enum AutoLayoutMode {
    Auto = "auto"
}
/** @internal */
export declare enum PrimitiveTopology {
    PointList = "point-list",
    LineList = "line-list",
    LineStrip = "line-strip",
    TriangleList = "triangle-list",
    TriangleStrip = "triangle-strip"
}
/** @internal */
export declare enum FrontFace {
    CCW = "ccw",
    CW = "cw"
}
/** @internal */
export declare enum CullMode {
    None = "none",
    Front = "front",
    Back = "back"
}
/** @internal */
export declare enum ColorWrite {
    Red = 1,
    Green = 2,
    Blue = 4,
    Alpha = 8,
    All = 15
}
/** @internal */
export declare enum BlendFactor {
    Zero = "zero",
    One = "one",
    Src = "src",
    OneMinusSrc = "one-minus-src",
    SrcAlpha = "src-alpha",
    OneMinusSrcAlpha = "one-minus-src-alpha",
    Dst = "dst",
    OneMinusDst = "one-minus-dst",
    DstAlpha = "dst-alpha",
    OneMinusDstAlpha = "one-minus-dst-alpha",
    SrcAlphaSaturated = "src-alpha-saturated",
    Constant = "constant",
    OneMinusConstant = "one-minus-constant"
}
/** @internal */
export declare enum BlendOperation {
    Add = "add",
    Subtract = "subtract",
    ReverseSubtract = "reverse-subtract",
    Min = "min",
    Max = "max"
}
/** @internal */
export declare enum StencilOperation {
    Keep = "keep",
    Zero = "zero",
    Replace = "replace",
    Invert = "invert",
    IncrementClamp = "increment-clamp",
    DecrementClamp = "decrement-clamp",
    IncrementWrap = "increment-wrap",
    DecrementWrap = "decrement-wrap"
}
/** @internal */
export declare enum IndexFormat {
    Uint16 = "uint16",
    Uint32 = "uint32"
}
/** @internal */
export declare enum VertexFormat {
    Uint8x2 = "uint8x2",
    Uint8x4 = "uint8x4",
    Sint8x2 = "sint8x2",
    Sint8x4 = "sint8x4",
    Unorm8x2 = "unorm8x2",
    Unorm8x4 = "unorm8x4",
    Snorm8x2 = "snorm8x2",
    Snorm8x4 = "snorm8x4",
    Uint16x2 = "uint16x2",
    Uint16x4 = "uint16x4",
    Sint16x2 = "sint16x2",
    Sint16x4 = "sint16x4",
    Unorm16x2 = "unorm16x2",
    Unorm16x4 = "unorm16x4",
    Snorm16x2 = "snorm16x2",
    Snorm16x4 = "snorm16x4",
    Float16x2 = "float16x2",
    Float16x4 = "float16x4",
    Float32 = "float32",
    Float32x2 = "float32x2",
    Float32x3 = "float32x3",
    Float32x4 = "float32x4",
    Uint32 = "uint32",
    Uint32x2 = "uint32x2",
    Uint32x3 = "uint32x3",
    Uint32x4 = "uint32x4",
    Sint32 = "sint32",
    Sint32x2 = "sint32x2",
    Sint32x3 = "sint32x3",
    Sint32x4 = "sint32x4",
    UNORM10x10x10x2 = "unorm10-10-10-2"
}
/** @internal */
export declare enum VertexStepMode {
    Vertex = "vertex",
    Instance = "instance"
}
/** @internal */
export declare enum ComputePassTimestampLocation {
    Beginning = "beginning",
    End = "end"
}
/** @internal */
export declare enum RenderPassTimestampLocation {
    Beginning = "beginning",
    End = "end"
}
/** @internal */
export declare enum LoadOp {
    Load = "load",
    Clear = "clear"
}
/** @internal */
export declare enum StoreOp {
    Store = "store",
    Discard = "discard"
}
/** @internal */
export declare enum QueryType {
    Occlusion = "occlusion",
    Timestamp = "timestamp"
}
/** @internal */
export declare enum CanvasAlphaMode {
    Opaque = "opaque",
    Premultiplied = "premultiplied"
}
/** @internal */
export declare enum DeviceLostReason {
    Unknown = "unknown",
    Destroyed = "destroyed"
}
/** @internal */
export declare enum ErrorFilter {
    Validation = "validation",
    OutOfMemory = "out-of-memory",
    Internal = "internal"
}
