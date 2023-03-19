import { Icon } from "@iconify/react";



function LoadingPage() {
    
    const div = { display:'flex', justifyContent:'center',flexDirection:'column', alignItems:'center',height:'100vh', width:"100%" }
    
    return (<div style={div} >

            <Icon icon="icon-park-twotone:rocket-one" color="#805a9d" height={72} />

    </div>);
}

export default LoadingPage;