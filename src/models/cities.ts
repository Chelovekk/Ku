'use strict';
import {
    Column,
    Model,
    Table,
    DataType,
    AllowNull,
    PrimaryKey,
    AutoIncrement,
    BelongsToMany, HasMany
} from "sequelize-typescript";
import {Users_cities} from "./users_cities";
import {Users} from "./users";
import {City_weather_data} from "./city_weather_data";

interface CitiesAttributes{
    city_name: string,
}

@Table({
    tableName: 'cities',
    timestamps   : false
})
export class Cities extends Model<CitiesAttributes> implements CitiesAttributes{
    @BelongsToMany(()=>Users, ()=>Users_cities)
    users!: Users[]

    @HasMany(() => City_weather_data)
    cwd!: City_weather_data[]

    @PrimaryKey
    @AutoIncrement
    @AllowNull(false)
    @Column({
        type: DataType.INTEGER
    })
    id!: number;

    @AllowNull(false)
    @Column({
        type: DataType.STRING
    })
    city_name!: string;
};
