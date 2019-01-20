export class RouterHelper {
    static paramResolver(name) {
        return ($transition$) => ($transition$.params()[name])
    }
}