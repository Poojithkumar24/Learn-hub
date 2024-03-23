import { Button } from "@/components/ui/button";

const Proggress = () => {
    return (
        <div className="h-full flex items-center justify-center">
            <Button className="mr-5">
              Create a Quiz
            </Button>
            <Button className="ml-5">
              Create an Assignment
            </Button>
        </div>
      );
}
 
export default Proggress;