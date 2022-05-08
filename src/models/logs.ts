'use strict';
import {
    Column,
    Model,
    Table,
    DataType,
    AllowNull,
    PrimaryKey,
    AutoIncrement,
    BelongsToMany,
    HasOne, BelongsTo, ForeignKey, CreatedAt
} from "sequelize-typescript";
import {Cities} from "./cities";
import {Users_cities} from "./users_cities";
import {BilingsData} from "./biling_data";
import {LogTypes} from "./log_types";
import {Users} from "./users";

@Table({
    tableName: 'logs',
    timestamps: true
})
export class Logs extends Model {
    @PrimaryKey
    @AutoIncrement
    @AllowNull(false)
    @Column({
        type: DataType.INTEGER.UNSIGNED
    })
    id!: number;

    @AllowNull(false)
    @ForeignKey(() => LogTypes)
    @Column({
        type: DataType.INTEGER.UNSIGNED
    })
    logTypeId!: number

    @AllowNull(false)
    @Column({
        type: DataType.STRING
    })
    data!: string;

    @CreatedAt
    readonly createdAt!: Date;

    @BelongsTo(() => LogTypes)
    type!: LogTypes;
};
