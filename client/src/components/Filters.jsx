import React from "react"


export default function Filters({ handleFilterType, handleFilterCreated, allTypes }) {
    return (
        <div className="filters">
            <h3>Filter</h3>
            <div className="custom-select">
                <select name="filterType" id="" onChange={(e) => (handleFilterType(e))}>
                    <option value="" disabled selected hidden>by type</option>
                    <option value="all">All</option>
                    {
                        allTypes?.map(el => <option value={el.name} key={el.id}>{el.name}</option>)
                    }
                </select>
                <select name="origin" id="" onChange={(e) => (handleFilterCreated(e))}>
                    <option value="" disabled selected hidden>by origin</option>
                    <option value="all">All</option>
                    <option value="api">From Api</option>
                    <option value="db">From DataBase</option>
                </select>
            </div>

        </div>
    )
}