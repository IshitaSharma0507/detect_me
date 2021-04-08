import'./ImageLinkForm.css'

const ImageLinkForm = ({onInputChange,onButtonSubmit}) =>{
    return (
     <div >
        <p className ="f3">
            {'This Magic Brain will detect faces in you pictures.'}
        </p>
        <div className='center' >
            <div className ="form center pa4 br3 shadow-5">
            <input className='f3 pa2 w-70 center' type="text" onChange={onInputChange} />
            <button className='w-30 grow f3 link ph3 pv2 dib white bg-light-purple center'
            onClick={onButtonSubmit}
            >Detect</button>
        </div>
        </div>

     </div>
    );
}
export default ImageLinkForm;