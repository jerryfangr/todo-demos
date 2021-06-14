import { modules } from "./modules";

/**
 * * 先决条件，当前版本的 vue 把多个modules的 getters里的属性合并为一个对象调用
 * * 是 store.getters.xxx 而不是 store.getters.xxModule.xx
 */


/* 获取到 getters 结构类型 */
// 匹配到 单个module 下的 getter，小技巧 infer 为某一项
type GetGetter<GetterType> = GetterType extends { getters: infer G } ? G : unknown;
// 获取 vuex 所有的 getters 模块
type GetGetters<GetterTypes> = {
  [K in keyof GetterTypes]: GetGetter<GetterTypes[K]>;
};
type ModuleGetters = GetGetters<typeof modules>;

// --------------------

/* 获取到 mutations 结构类型 */
// 配到 单个 module 下的 mutations
type GetMutation<MutationType> = MutationType extends { mutations: infer M } ? M : unknown;
// 获取 vuex 所有的 mutations 模块
type GetMutations<MutationTypes> = {
  [K in keyof MutationTypes]: GetMutation<MutationTypes[K]>;
};
type ModuleMutations = GetMutations<typeof modules>;

// --------------------

/* 获取到 actions 结构类型 */
// 配到 单个 module 下的 action
type GetAction<ActionType> = ActionType extends { actions: infer A } ? A : unknown;
// 获取 vuex 所有的 actions 模块
type GetActions<ActionTypes> = {
  [K in keyof ActionTypes]: GetAction<ActionTypes[K]>;
};
type ModuleActions = GetActions<typeof modules>;

// --------------------

/* Getter/Commit/Dispatch 智能提示处理 */
// gettters[模块名/方法]、commit[模块名/方法]、dispatch[模块名/方法]
// ts4.1 以上支持 模板字符串语法，需要安装最新的 yarn typescript（目前yarn add typescript@next）
// 传入的是 keyof 有可能是symbol | number,所以 P & string 取其中的string
type AddPrefix<P, K> = `${P & string}/${K & string}`;

// 
type GetSpliceKey<Module, Key> = AddPrefix<Key, keyof Module>

type GetSpliceKeys<Modules> = {
  [K in keyof Modules]: GetSpliceKey<Modules[K], K>
}[keyof Modules]
// type xx = GetSpliceKeys<ModuleGetters>

type GetFunc<T, A, B> = T[A & keyof T][B & keyof T[A & keyof T]];
type GetSpliceObj<T> = {
  // K extends `${infer A}/${infer B}`   相当于  user/loginInfo  A=>user B=>loginInfo
  [K in GetSpliceKeys<T>]: K extends `${infer A}/${infer B}` ? GetFunc<T, A, B> : unknown
}



// --------------------

/* Getters/Mutations/Actons 拼接好 xxx/xxx 的格式  */
type GenGetters = GetSpliceObj<ModuleGetters>;
type Getters = {
  [K in keyof GenGetters]: ReturnType<GenGetters[K]>
}



type RemovePrefix<K> = K extends `${infer A}/${infer B}` ? B : K;
type Getters2 = {
  [K in RemovePrefix<keyof Getters>]: any
}

export { 
  Getters,
  Getters2
}