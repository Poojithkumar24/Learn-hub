import  Image  from "next/image";
const AuthLayout = ({
    children
}:{
    children:React.ReactNode
}) => {
    return (
        <div className="h-full flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500">
            
            {children}
        </div>        
     );
}
 
export default AuthLayout;