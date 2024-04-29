export default function (context) {
    if (context.store.getters.token == null ) {
        context.redirect('/client/login')
    }
}