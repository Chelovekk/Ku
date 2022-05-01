'use strict';
import {
    Column,
    Model,
    Table,
    DataType,
    AllowNull,
    PrimaryKey,
    AutoIncrement,
    BelongsTo, ForeignKey
} from "sequelize-typescript";
import {Users} from "./users";
import {Cities} from "./cities";


@Table({
    tableName: 'billings_data',
    timestamps: false
})
export class BilingsData extends Model {

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
    customerId!: string

    @AllowNull(true)
    @Column({
        type: DataType.STRING
    })
    subscriptionId!: string

    @AllowNull(true)
    @Column({
        type: DataType.DATE
    })
    billings_period_end!: Date;

    @AllowNull(false)
    @ForeignKey(()=>Users)
    @Column({
        type: DataType.INTEGER
    })
    userId!: number;

    @BelongsTo(() => Users)
    user?: Users
};
