'use strict';
import {
    Column,
    Model,
    Table,
    DataType,
    AllowNull,
    PrimaryKey,
    AutoIncrement,
    BelongsToMany, ForeignKey
} from "sequelize-typescript";
import {Cities} from "./cities";

interface CityWeatherAttributes {
    id?: number,
    city_id: number,
    temp: number,
    speed: number
    feels_like: number,
    humidity: number
}

@Table({
    tableName: 'city_weather_data'
})
export class City_weather_data extends Model<CityWeatherAttributes> implements CityWeatherAttributes {
    @PrimaryKey
    @AutoIncrement
    @AllowNull(false)
    @Column({
        type: DataType.INTEGER
    })
    id!: number;


    @AllowNull(false)
    @ForeignKey(() => Cities)
    @Column({
        type: DataType.INTEGER
    })
    city_id!: number;

    @AllowNull(false)
    @Column({
        type: DataType.INTEGER
    })
    temp!: number;

    @AllowNull(false)
    @Column({
        type: DataType.INTEGER
    })
    feels_like!: number;

    @AllowNull(false)
    @Column({
        type: DataType.INTEGER
    })
    speed!: number;

    @AllowNull(false)
    @Column({
        type: DataType.INTEGER
    })
    humidity!: number;
};
