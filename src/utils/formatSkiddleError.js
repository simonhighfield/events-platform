export default function formatSkiddleError (skiddleError) {

    return {
        message: skiddleError.errormessage,
        code: skiddleError.errorcode,
        details: skiddleError.requestId,
        hint: null,
    }   
}