const ResultMessage = ({message}) => {
    return ( 
        <div className="py-2 mt-2 flex text-slate-700 text-xs lg:text-sm self-center">
            <span>{message}</span>
        </div>
     );
}
 
export default ResultMessage;