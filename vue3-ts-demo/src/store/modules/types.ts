import modules from './index' 

/**
 * module etters| mutations | actions type
 * 该内容也可选择放置到 '@/hooks/utils'
 */

/***************************/

// 匹配 getters| mutations | actions 属性 并直接挂载到 moudule 下
// { moduleName: {  getters: { getters1: ()=>{} } } }  -> { moduleName: { getters1: ()=>{} } }
type GetGetter<Module> = Module extends { getters: infer G } ? G : unknown
type GetGetters<Modules> = {
  [K in keyof Modules]: GetGetter<Modules[K]>
}
type ModuleGetters = GetGetters<typeof modules>;

/***************************/

// 匹配 mutations 属性 并直接挂载到 moudule 下
type GetMutation<Module> = Module extends { mutations: infer M } ? M : unknown
type GetMutations<Modules> = {
  [K in keyof Modules]: GetMutation<Modules[K]>
}
type ModuleMutations = GetMutations<typeof modules>;

// --------------------

// 匹配 actions 属性 并直接挂载到 moudule 下
type GetAction<Module> = Module extends { actions: infer A } ? A : unknown
type GetActions<Modules> = {
  [K in keyof Modules]: GetAction<Modules[K]>
}
type ModuleActions = GetActions<typeof modules>;

/***************************/

// 生成 vuex 采用的 ModuleName/key
// { moduleName: { getters1: ()=>{} } } -> ['moduleName/getters1']
type AddPrefix<Prefix, Key> = `${Prefix & string}/${Key & string}`
type GetSpliceKey<MN, MG> = AddPrefix<MN, keyof MG>
type GetSpliceKeys<MGS> = {
  [MN in keyof MGS]: GetSpliceKey<MN, MGS[MN]>
}[keyof MGS]

type GetFunc<MGS, MN, GN> = MGS[MN & keyof MGS][GN & keyof MGS[MN & keyof MGS]]
type GetSpliceObj<MGS> = {
  [GN in GetSpliceKeys<MGS>]: GN extends `${infer MN}/${infer GN}` ? GetFunc<MGS, MN, GN> : unknown
}

/***************************/

// getters 匹配 上步的 GetSpliceKeys，建立 key 对应函数返回值的关系
type GettersObj = GetSpliceObj<ModuleGetters>
type Getters = {
  [K in keyof GettersObj]: ReturnType<GettersObj[K]>
}

// --------------------

// mutations, 配置 Commit(mutation, payload): void
type MutationsObj = GetSpliceObj<ModuleMutations>;
type Mutations = {
  [K in keyof MutationsObj]: ReturnType<MutationsObj[K]>
}
type MutationsPayload = {
  // Parameters 获取函数参数
  [K in keyof MutationsObj]: Parameters<MutationsObj[K]>[1]
}
interface GetCommit<T> {
  // 可选参数类型，会自动加上undefined
  <K extends keyof T>(mutation: K, payload?: T[K]): void;
}

type Commit = GetCommit<MutationsPayload>;



// --------------------

// actions，类似mutations
type ActionsObj = GetSpliceObj<ModuleActions>;
type Actions = {
  [K in keyof ActionsObj]: ReturnType<ActionsObj[K]>
}

type ActionPayload = {
  [K in keyof ActionsObj]: Parameters<ActionsObj[K]>[1]
}
interface GetDispatch<T> {
  <K extends keyof T>(action: K, payload?: T[K]): Promise<unknown>;
}

type Dispatch = GetDispatch<ActionPayload>;

// --------------------

export {
  Getters, Mutations, Actions, Dispatch, Commit
};