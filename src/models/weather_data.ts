'use strict';
import {Column, Model, Table, DataType, AllowNull, PrimaryKey, AutoIncrement} from "sequelize-typescript";
import {OpenweatherData} from "../services/openweather/Request.interface";

interface WeatherDataAttributes extends OpenweatherData {
  id? : number
}

  @Table({
    tableName: 'weather_data'
  })
  export class Weather_data extends Model<WeatherDataAttributes> implements WeatherDataAttributes {

    @PrimaryKey
    @AutoIncrement
    @AllowNull
    @Column({
      type: DataType.INTEGER
    })
    id!: number;

    @AllowNull
    @Column({
      type: DataType.FLOAT
    })
    lat!: number;

    @AllowNull
    @Column({
      type: DataType.FLOAT
    })
    lon!: number;

    @AllowNull
    @Column({
      type:DataType.STRING
    })
    timezone!: string;

    @AllowNull
    @Column({
      type: DataType.INTEGER
    })
    timezone_offset!: number;
  };
