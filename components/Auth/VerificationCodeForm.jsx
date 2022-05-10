import { isEmpty } from 'lodash';
import { useState, useRef } from 'react';
import { BeatLoader } from 'react-spinners';

const VerificationCodeForm = ({ loading, handleCheckVCode }) => {

    const [vcode1, setVCode1] = useState("")
    const [vcode2, setVCode2] = useState("")
    const [vcode3, setVCode3] = useState("")
    const [vcode4, setVCode4] = useState("")
    const [vcode5, setVCode5] = useState("")
    const [vcode6, setVCode6] = useState("")

    const vcode1ref = useRef()
    const vcode2ref = useRef()
    const vcode3ref = useRef()
    const vcode4ref = useRef()
    const vcode5ref = useRef()
    const vcode6ref = useRef()

    const handleVCodeChande = (vcodeId, value) => {
        console.log("change");
        let validNumbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
        if (!isEmpty(value) && !validNumbers.includes(value)) return;

        switch (`${vcodeId}`) {
            case "1":
                if (value === "") {
                    setVCode1(value)
                    // handleFocusOnPrevInputs(vcodeId)
                    return
                }
                setVCode1(value)
                handleFocusOnNextInputs(vcodeId)
                break;
            case "2":
                if (value === "") {
                    setVCode2(value)
                    // handleFocusOnPrevInputs(vcodeId)
                    return
                }
                setVCode2(value)
                handleFocusOnNextInputs(vcodeId)
                break;
            case "3":
                if (value === "") {
                    setVCode3(value)
                    // handleFocusOnPrevInputs(vcodeId)
                    return
                }
                setVCode3(value)
                handleFocusOnNextInputs(vcodeId)
                break;
            case "4":
                if (value === "") {
                    setVCode4(value)
                    // handleFocusOnPrevInputs(vcodeId)
                    return
                }
                setVCode4(value)
                handleFocusOnNextInputs(vcodeId)
                break;
            case "5":
                if (value === "") {
                    setVCode5(value)
                    // handleFocusOnPrevInputs(vcodeId)
                    return
                }
                setVCode5(value)
                handleFocusOnNextInputs(vcodeId)
                break;
            case "6":
                if (value === "") {
                    setVCode6(value)
                    // handleFocusOnPrevInputs(vcodeId)
                    return
                }
                setVCode6(value)
                handleFocusOnNextInputs(vcodeId)
                break;

            default:
                break;
        }


    }

    const handleFocusOnNextInputs = (vcodeId) => {
        switch (`${vcodeId}`) {
            case "1":
                vcode2ref.current.select()
                break;
            case "2":
                vcode3ref.current.select()
                break;
            case "3":
                vcode4ref.current.select()
                break;
            case "4":
                vcode5ref.current.select()
                break;
            case "5":
                vcode6ref.current.select()
                break;


            default:
                break;
        }
    }
    const handleFocusOnPrevInputs = (vcodeId, e) => {

        switch (`${vcodeId}`) {
            case "2":
                e.preventDefault()
                vcode1ref.current.select()
                break;
            case "3":
                e.preventDefault()
                vcode2ref.current.select()
                break;
            case "4":
                e.preventDefault()
                vcode3ref.current.select()
                break;
            case "5":
                e.preventDefault()
                vcode4ref.current.select()
                break;
            case "6":
                e.preventDefault()
                vcode5ref.current.select()
                break;

            default:
                break;
        }
    }

    const handleOnInput = (e, value, vcodeId) => {
        if (e.keyCode === 8 && value === "") {
            handleFocusOnPrevInputs(vcodeId, e)
        }
    }

    const onSubmit = (e) => {
        e.preventDefault()
        let vcode = `${vcode1}${vcode2}${vcode3}${vcode4}${vcode5}${vcode6}`

        if (vcode.length !== 6) return

        handleCheckVCode(vcode)
    }

    return (
        <form className="flex flex-col w-3/4 lg:w-2/5 mt-4 self-center" onSubmit={event => onSubmit(event)}>
            <label className="text-xs text-gray-500 mb-2" htmlFor="">کد تایید</label>
            <div className="grid grid-cols-6 gap-x-2" style={{ direction: "ltr" }}>
                <input type="text" maxLength="1" ref={vcode1ref} value={vcode1} onKeyDown={event => handleOnInput(event, event.target.value, 1)} onChange={event => handleVCodeChande(1, event.target.value)} autoFocus className="col-span-1 text-center form-control block w-full px-3 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border-2 border-solid rounded-lg transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-amber-400 focus:outline-none" />
                <input type="text" maxLength="1" ref={vcode2ref} value={vcode2} onKeyDown={event => handleOnInput(event, event.target.value, 2)} onChange={event => handleVCodeChande(2, event.target.value)} className="col-span-1 text-center form-control block w-full px-3 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border-2 border-solid rounded-lg transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-amber-400 focus:outline-none" />
                <input type="text" maxLength="1" ref={vcode3ref} value={vcode3} onKeyDown={event => handleOnInput(event, event.target.value, 3)} onChange={event => handleVCodeChande(3, event.target.value)} className="col-span-1 text-center form-control block w-full px-3 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border-2 border-solid rounded-lg transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-amber-400 focus:outline-none" />
                <input type="text" maxLength="1" ref={vcode4ref} value={vcode4} onKeyDown={event => handleOnInput(event, event.target.value, 4)} onChange={event => handleVCodeChande(4, event.target.value)} className="col-span-1 text-center form-control block w-full px-3 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border-2 border-solid rounded-lg transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-amber-400 focus:outline-none" />
                <input type="text" maxLength="1" ref={vcode5ref} value={vcode5} onKeyDown={event => handleOnInput(event, event.target.value, 5)} onChange={event => handleVCodeChande(5, event.target.value)} className="col-span-1 text-center form-control block w-full px-3 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border-2 border-solid rounded-lg transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-amber-400 focus:outline-none" />
                <input type="text" maxLength="1" ref={vcode6ref} value={vcode6} onKeyDown={event => handleOnInput(event, event.target.value, 6)} onChange={event => handleVCodeChande(6, event.target.value)} className="col-span-1 text-center form-control block w-full px-3 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border-2 border-solid rounded-lg transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-amber-400 focus:outline-none" />
            </div>

            {loading ? (
                <button className="btn bg-amber-300 text-slate-900 flex-center mt-2" type='submit'>
                    <BeatLoader color={"#000"} loading={loading} size={5} />
                </button>

            ) : (
                <button className="btn bg-amber-300 text-slate-900 mt-2" type='submit'>تایید</button>
            )}
        </form>
    );
}

export default VerificationCodeForm;