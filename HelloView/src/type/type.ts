// types.ts
export type RootStackParamList = {
    View: undefined;  // ViewScreen 不需要参数
    Detail: { itemId: number };  // Detail screen 需要 itemId 参数
};

export type DetailStackParam = {
Detail: { itemId: number };  // 定义 Detail 屏幕的参数类型
// 可以添加其他屏幕
};