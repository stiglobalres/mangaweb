import { useParams, Link, generatePath } from "react-router-dom"

import { urlFormatter } from "../constant.ts";

export default function Flatlist({render}) {
    

    let data = render.data;
    data.sort(function(a, b){return b[render.sort]-a[render.sort]});
    let result = [];

    data.map((item, id) =>{
        result.push(<List key={id} name={(id & 1) ? 'odd':'even'} item={item} />);
    });

    return(
        <div className="container">
            <div className="box">
                <div className="header">
                    <span className="uppercase-bold">{render.title}</span>
                </div>
                <div >
                    {result}
                </div>
            </div>
        </div>
    );
}

function List({name, item}) {
    const {title} = useParams();
    let url= urlFormatter(generatePath('/chapter/:mangaId/:chapterId/:title/:chapter',
    {
        chapterId: item.id, 
        mangaId: item.manga, 
        chapter: item.title,
        title: title
    }));
    return (
        <div className={name}>
            <div className="col-50">
                <span className="fs-12-white-capitalize"> 
                    <Link to={url}>{item.title}</Link>
                </span>
            </div>
        </div>
    );
}