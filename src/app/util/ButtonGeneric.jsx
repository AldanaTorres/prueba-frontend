import { Button } from "reactstrap";



export default function ButtonGeneric(props){

    const data = props.data;

    const go = props.actions;

    const icon = props.icon

    return(
        <Button className="group-button" size="xd" id={icon} onClick={() => go(data)}>
                <i className={"fa " + icon} />
        </Button>
    )
}