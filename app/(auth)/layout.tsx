import  Image  from "next/image";
const AuthLayout = ({
    children
}:{
    children:React.ReactNode
}) => {
    return (
        <div className="h-full flex items-center justify-center bg-gradient-to-br from-indigo-800 to-orange-600">
            
            {children}
        </div>        
     );
}
 
export default AuthLayout;