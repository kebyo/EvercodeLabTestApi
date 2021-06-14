/**
 * Name validator
 *
 * @param name - name
 */
export default (name: string) => {
    const nameRegExp: RegExp = /^[A-Za-z0-9]{1,20}$/;

    return nameRegExp.test(name);
}
