/*==============================================================*/
/* DBMS name:      ORACLE Version 10g                           */
/* Created on:     2017/2/13 10:46:55                           */
/*==============================================================*/


alter table TAdmin
   drop constraint FK_TADMIN_RELATIONS_TROLE;

alter table TApplicationForm
   drop constraint FK_TAPPLICA_RELATIONS_TMOBILEC;

alter table TApplicationForm
   drop constraint FK_TAPPLICA_RELATIONS_TPACKAGE;

alter table TCapitalFlow
   drop constraint FK_TCAPITAL_RELATIONS_TUSER;

alter table TCapitalFlow
   drop constraint FK_TCAPITAL_RELATIONS_TAREA;

alter table TDictionary
   drop constraint FK_TDICTION_RELATIONS_TDICTION;

alter table TLog
   drop constraint FK_TLOG_RELATIONS_TUSER;

alter table TMobileCard
   drop constraint FK_TMOBILEC_RELATIONS_TUSER;

alter table TMobileCard
   drop constraint FK_TMOBILEC_RELATIONS_TPACKAGE;

alter table TOrders
   drop constraint FK_TORDERS_RELATIONS_THARVEST;

alter table TOrders
   drop constraint FK_TORDERS_RELATIONS_TCOMMODI;

alter table TOrders
   drop constraint FK_TORDERS_RELATIONS_TUSER;

alter table TPrepaidCard
   drop constraint FK_TPREPAID_RELATIONS_TAREA;

alter table TPrepaidCard
   drop constraint FK_TPREPAID_RELATIONS_TMOBILEC;

alter table TRechargeRecord
   drop constraint FK_TRECHARG_RELATIONS_TUSER;

alter table TRechargeRecord
   drop constraint FK_TRECHARG_RELATIONS_TAREA;

alter table TRelation
   drop constraint FK_TRELATIO_RELATIONS_TJURISDI;

alter table TRelation
   drop constraint FK_TRELATIO_RELATIONS_TROLE;

drop index Relationship_20_FK;

drop table TAdmin cascade constraints;

drop index Relationship_18_FK;

drop index Relationship_17_FK;

drop table TApplicationForm cascade constraints;

drop table TArea cascade constraints;

drop index Relationship_14_FK;

drop index Relationship_11_FK;

drop table TCapitalFlow cascade constraints;

drop table TCommodity cascade constraints;

drop table TCommunicationRecord cascade constraints;

drop index Relationship_21_FK;

drop table TDictionary cascade constraints;

drop table TDictionaryType cascade constraints;

drop table THarvestAddressInfo cascade constraints;

drop table TJurisdiction cascade constraints;

drop index Relationship_15_FK;

drop table TLog cascade constraints;

drop index Relationship_10_FK;

drop index Relationship_2_FK;

drop table TMobileCard cascade constraints;

drop index Relationship_12_FK;

drop index Relationship_9_FK;

drop index Relationship_1_FK;

drop table TOrders cascade constraints;

drop table TPackage cascade constraints;

drop index Relationship_5_FK;

drop index Relationship_4_FK;

drop table TPrepaidCard cascade constraints;

drop index Relationship_8_FK;

drop index Relationship_3_FK;

drop table TRechargeRecord cascade constraints;

drop index Relationship_22_FK;

drop index Relationship_19_FK;

drop table TRelation cascade constraints;

drop table TRole cascade constraints;

drop table TUser cascade constraints;

/*==============================================================*/
/* Table: TAdmin                                                */
/*==============================================================*/
create table TAdmin  (
   adminId              INTEGER                         not null,
   roleId               INTEGER,
   adminName            VARCHAR2(50),
   adminPassword        VARCHAR2(50),
   constraint PK_TADMIN primary key (adminId)
);

/*==============================================================*/
/* Index: Relationship_20_FK                                    */
/*==============================================================*/
create index Relationship_20_FK on TAdmin (
   roleId ASC
);

/*==============================================================*/
/* Table: TApplicationForm                                      */
/*==============================================================*/
create table TApplicationForm  (
   applicationId        INTEGER                         not null,
   packageId            INTEGER,
   mobileCardId         INTEGER,
   applicationState     INTEGER                         not null,
   constraint PK_TAPPLICATIONFORM primary key (applicationId)
);

/*==============================================================*/
/* Index: Relationship_17_FK                                    */
/*==============================================================*/
create index Relationship_17_FK on TApplicationForm (
   mobileCardId ASC
);

/*==============================================================*/
/* Index: Relationship_18_FK                                    */
/*==============================================================*/
create index Relationship_18_FK on TApplicationForm (
   packageId ASC
);

/*==============================================================*/
/* Table: TArea                                                 */
/*==============================================================*/
create table TArea  (
   areaId               INTEGER                         not null,
   areaName             VARCHAR2(200),
   constraint PK_TAREA primary key (areaId)
);

/*==============================================================*/
/* Table: TCapitalFlow                                          */
/*==============================================================*/
create table TCapitalFlow  (
   capitalFlowId        INTEGER                         not null,
   userId               INTEGER,
   areaId               INTEGER,
   flowMoney            NUMBER(17,4) ,
   flowScore            NUMBER,
   flowTime             DATE                            not null,
   flowOperation        VARCHAR2(2000)                  not null,
   constraint PK_TCAPITALFLOW primary key (capitalFlowId)
);

/*==============================================================*/
/* Index: Relationship_11_FK                                    */
/*==============================================================*/
create index Relationship_11_FK on TCapitalFlow (
   userId ASC
);

/*==============================================================*/
/* Index: Relationship_14_FK                                    */
/*==============================================================*/
create index Relationship_14_FK on TCapitalFlow (
   areaId ASC
);

/*==============================================================*/
/* Table: TCommodity                                            */
/*==============================================================*/
create table TCommodity  (
   commodityNumber      INTEGER                         not null,
   commodityName        VARCHAR2(200)                   not null,
   commodityPrice       NUMBER(17,4),
   commodityIntegral    INTEGER,
   commodityImgPath     VARCHAR2(2000),
   commodityInfo        VARCHAR2(2000),
   commodityStock       INTEGER,
   commodityType        INTEGER                         not null,
   constraint PK_TCOMMODITY primary key (commodityNumber)
);

comment on table TCommodity is
'��Ʒ���ͣ�   2--�绰��  1--������Ʒ';

/*==============================================================*/
/* Table: TCommunicationRecord                                  */
/*==============================================================*/
create table TCommunicationRecord  (
   communicationRecordId INTEGER                         not null,
   callingNumber        NUMBER(11,0),
   calledNumber         NUMBER(11,0),
   communicationTime    DATE,
   callDuration         DATE,
   communicationMoney   NUMBER(17,4),
   communicationType    VARCHAR2(50),
   constraint PK_TCOMMUNICATIONRECORD primary key (communicationRecordId)
);

/*==============================================================*/
/* Table: TDictionary                                           */
/*==============================================================*/
create table TDictionary  (
   dictionaryId         INTEGER                         not null,
   dictionaryTypeId     INTEGER,
   dictionaryValue      VARCHAR2(200),
   remarks              VARCHAR2(500),
   constraint PK_TDICTIONARY primary key (dictionaryId)
);

/*==============================================================*/
/* Index: Relationship_21_FK                                    */
/*==============================================================*/
create index Relationship_21_FK on TDictionary (
   dictionaryTypeId ASC
);

/*==============================================================*/
/* Table: TDictionaryType                                       */
/*==============================================================*/
create table TDictionaryType  (
   dictionaryTypeId     INTEGER                         not null,
   dictionaryTypeName   VARCHAR2(100),
   constraint PK_TDICTIONARYTYPE primary key (dictionaryTypeId)
);

/*==============================================================*/
/* Table: THarvestAddressInfo                                   */
/*==============================================================*/
create table THarvestAddressInfo  (
   harvestAddressInfoId INTEGER                         not null,
   harvestName          VARCHAR2(200)                   not null,
   harvestPhoneNumber   NUMBER(11,0)                    not null,
   harvestAddress       VARCHAR2(2000)                  not null,
   postCode             NUMBER(6,0)                     not null,
   constraint PK_THARVESTADDRESSINFO primary key (harvestAddressInfoId)
);

/*==============================================================*/
/* Table: TJurisdiction                                         */
/*==============================================================*/
create table TJurisdiction  (
   jurisdictionId       INTEGER                         not null,
   jurisdictionContent  VARCHAR2(500),
   constraint PK_TJURISDICTION primary key (jurisdictionId)
);

/*==============================================================*/
/* Table: TLog                                                  */
/*==============================================================*/
create table TLog  (
   communicationRecordId INTEGER                         not null,
   userId               INTEGER,
   logOperation         VARCHAR2(400)                   not null,
   logOperationTime     DATE                            not null,
   constraint PK_TLOG primary key (communicationRecordId)
);

/*==============================================================*/
/* Index: Relationship_15_FK                                    */
/*==============================================================*/
create index Relationship_15_FK on TLog (
   userId ASC
);

/*==============================================================*/
/* Table: TMobileCard                                           */
/*==============================================================*/
create table TMobileCard  (
   mobileCardId         INTEGER                         not null,
   packageId            INTEGER,
   userId               INTEGER,
   phoneNumber          NUMBER(11,0),
   servicePwd           NUMBER(6,0),
   costBalance          NUMBER(17,4),
   remainingScore       INTEGER,
   realName             VARCHAR2(200),
   idCard               VARCHAR2(18),
   attribution          VARCHAR2(50),
   numberPrice          NUMBER(17,4),
   applicationState     INTEGER,
   constraint PK_TMOBILECARD primary key (mobileCardId)
);

comment on table TMobileCard is
'״̬��ͣ�� ��Ƿ�ѡ�����';

/*==============================================================*/
/* Index: Relationship_2_FK                                     */
/*==============================================================*/
create index Relationship_2_FK on TMobileCard (
   packageId ASC
);

/*==============================================================*/
/* Index: Relationship_10_FK                                    */
/*==============================================================*/
create index Relationship_10_FK on TMobileCard (
   userId ASC
);

/*==============================================================*/
/* Table: TOrders                                               */
/*==============================================================*/
create table TOrders  (
   orderId              INTEGER                         not null,
   commodityNumber      INTEGER,
   harvestAddressInfoId INTEGER,
   userId               INTEGER,
   orderMoney           NUMBER(17,4)                    not null,
   placeOrderTime       DATE                            not null,
   cancelOrderTime      DATE,
   paymentTime          DATE,
   orderState           VARCHAR2(50)                    not null,
   paymentMode          VARCHAR2(50),
   shippingMode         VARCHAR2(50),
   whetherInvoice       VARCHAR2(2),
   constraint PK_TORDERS primary key (orderId)
);

/*==============================================================*/
/* Index: Relationship_1_FK                                     */
/*==============================================================*/
create index Relationship_1_FK on TOrders (
   harvestAddressInfoId ASC
);

/*==============================================================*/
/* Index: Relationship_9_FK                                     */
/*==============================================================*/
create index Relationship_9_FK on TOrders (
   userId ASC
);

/*==============================================================*/
/* Index: Relationship_12_FK                                    */
/*==============================================================*/
create index Relationship_12_FK on TOrders (
   commodityNumber ASC
);

/*==============================================================*/
/* Table: TPackage                                              */
/*==============================================================*/
create table TPackage  (
   packageId            INTEGER                         not null,
   packageMoney         NUMBER(17,4),
   packageInfo          VARCHAR2(2000),
   constraint PK_TPACKAGE primary key (packageId)
);

comment on table TPackage is
'�ײ���Ϣ����������,��������,���ڶ���/���ڲ���,WIFIʱ����';

/*==============================================================*/
/* Table: TPrepaidCard                                          */
/*==============================================================*/
create table TPrepaidCard  (
   prepaidCardId        INTEGER                         not null,
   areaId               INTEGER,
   mobileCardId         INTEGER,
   faceValue            INTEGER,
   prepaidCardPassword  INTEGER,
   prepaidCardState     VARCHAR2(50),
   sallTime             DATE,
   constraint PK_TPREPAIDCARD primary key (prepaidCardId)
);

/*==============================================================*/
/* Index: Relationship_4_FK                                     */
/*==============================================================*/
create index Relationship_4_FK on TPrepaidCard (
   areaId ASC
);

/*==============================================================*/
/* Index: Relationship_5_FK                                     */
/*==============================================================*/
create index Relationship_5_FK on TPrepaidCard (
   mobileCardId ASC
);

/*==============================================================*/
/* Table: TRechargeRecord                                       */
/*==============================================================*/
create table TRechargeRecord  (
   communicationRecordId INTEGER                         not null,
   userId               INTEGER,
   areaId               INTEGER,
   rechargePhoneNumber  NUMBER(11,0),
   rechargeMoney        NUMBER(17,4),
   addIntegral          INTEGER,
   rechargeTime         DATE,
   constraint PK_TRECHARGERECORD primary key (communicationRecordId)
);

/*==============================================================*/
/* Index: Relationship_3_FK                                     */
/*==============================================================*/
create index Relationship_3_FK on TRechargeRecord (
   userId ASC
);

/*==============================================================*/
/* Index: Relationship_8_FK                                     */
/*==============================================================*/
create index Relationship_8_FK on TRechargeRecord (
   areaId ASC
);

/*==============================================================*/
/* Table: TRelation                                             */
/*==============================================================*/
create table TRelation  (
   relationId           INTEGER                         not null,
   jurisdictionId       INTEGER,
   roleId               INTEGER,
   constraint PK_TRELATION primary key (relationId)
);

/*==============================================================*/
/* Index: Relationship_19_FK                                    */
/*==============================================================*/
create index Relationship_19_FK on TRelation (
   jurisdictionId ASC
);

/*==============================================================*/
/* Index: Relationship_22_FK                                    */
/*==============================================================*/
create index Relationship_22_FK on TRelation (
   roleId ASC
);

/*==============================================================*/
/* Table: TRole                                                 */
/*==============================================================*/
create table TRole  (
   roleId               INTEGER                         not null,
   roleName             VARCHAR2(100),
   constraint PK_TROLE primary key (roleId)
);

/*==============================================================*/
/* Table: TUser                                                 */
/*==============================================================*/
create table TUser  (
   userId               INTEGER                         not null,
   userNickname         VARCHAR2(200),
   userRealname         VARCHAR2(200),
   userSex              VARCHAR2(10),
   userAge              INTEGER,
   userPwd              VARCHAR2(50),
   userPhotoPath        VARCHAR2(2000),
   userAddress          VARCHAR2(2000),
   userIdCard           VARCHAR2(18),
   userEmail            VARCHAR2(50),
   constraint PK_TUSER primary key (userId)
);

alter table TAdmin
   add constraint FK_TADMIN_RELATIONS_TROLE foreign key (roleId)
      references TRole (roleId);

alter table TApplicationForm
   add constraint FK_TAPPLICA_RELATIONS_TMOBILEC foreign key (mobileCardId)
      references TMobileCard (mobileCardId);

alter table TApplicationForm
   add constraint FK_TAPPLICA_RELATIONS_TPACKAGE foreign key (packageId)
      references TPackage (packageId);

alter table TCapitalFlow
   add constraint FK_TCAPITAL_RELATIONS_TUSER foreign key (userId)
      references TUser (userId);

alter table TCapitalFlow
   add constraint FK_TCAPITAL_RELATIONS_TAREA foreign key (areaId)
      references TArea (areaId);

alter table TDictionary
   add constraint FK_TDICTION_RELATIONS_TDICTION foreign key (dictionaryTypeId)
      references TDictionaryType (dictionaryTypeId);

alter table TLog
   add constraint FK_TLOG_RELATIONS_TUSER foreign key (userId)
      references TUser (userId);

alter table TMobileCard
   add constraint FK_TMOBILEC_RELATIONS_TUSER foreign key (userId)
      references TUser (userId);

alter table TMobileCard
   add constraint FK_TMOBILEC_RELATIONS_TPACKAGE foreign key (packageId)
      references TPackage (packageId);

alter table TOrders
   add constraint FK_TORDERS_RELATIONS_THARVEST foreign key (harvestAddressInfoId)
      references THarvestAddressInfo (harvestAddressInfoId);

alter table TOrders
   add constraint FK_TORDERS_RELATIONS_TCOMMODI foreign key (commodityNumber)
      references TCommodity (commodityNumber);

alter table TOrders
   add constraint FK_TORDERS_RELATIONS_TUSER foreign key (userId)
      references TUser (userId);

alter table TPrepaidCard
   add constraint FK_TPREPAID_RELATIONS_TAREA foreign key (areaId)
      references TArea (areaId);

alter table TPrepaidCard
   add constraint FK_TPREPAID_RELATIONS_TMOBILEC foreign key (mobileCardId)
      references TMobileCard (mobileCardId);

alter table TRechargeRecord
   add constraint FK_TRECHARG_RELATIONS_TUSER foreign key (userId)
      references TUser (userId);

alter table TRechargeRecord
   add constraint FK_TRECHARG_RELATIONS_TAREA foreign key (areaId)
      references TArea (areaId);

alter table TRelation
   add constraint FK_TRELATIO_RELATIONS_TJURISDI foreign key (jurisdictionId)
      references TJurisdiction (jurisdictionId);

alter table TRelation
   add constraint FK_TRELATIO_RELATIONS_TROLE foreign key (roleId)
      references TRole (roleId);

--ɾ������
drop  sequence dictionaryType_seq;
drop  sequence dictionary_seq;
drop sequence admin_seq;
drop sequence role_seq;
drop sequence relation_seq;
drop sequence commodity_seq;
drop sequence harvestAddressInfo_seq;
drop sequence order_seq;
drop sequence seqMobileCardId;
drop sequence seqUserId;
drop sequence app;
drop sequence seqCommunicationRecordId;
drop sequence area;
drop sequence PREPAIDCARDID_seq;
drop sequence seqRechargeRecordId;
drop sequence capitalflow_seq;

--�������ݿ�ġ��ӳٶδ���������Ϊfalse����Ҫ����Ӧ��Ȩ�ޣ�
 ALTER SYSTEM SET deferred_segment_creation=FALSE;

--�����ֻ�����Id�����У�6λ���֣�
create sequence seqMobileCardId increment by 1 start with 100000  nomaxvalue nocycle nocache;
--�����û���Id�����У�5λ���֣�
create sequence seqUserId increment by 1 start with 10000  nomaxvalue nocycle nocache;

--������־Id�����У�1λ���֣�
create sequence seqCommunicationRecordId increment by 1 start with 1  nomaxvalue nocycle nocache;

--��������Id�����У�1λ���֣�
create sequence area increment by 1 start with 1  nomaxvalue nocycle nocache;

--�������ӿ�Id�����У�1λ���֣�
CREATE SEQUENCE PREPAIDCARDID_seq INCREMENT BY 1 START WITH 1 NOMAXVALUE NOCYCLE NOCACHE;

CREATE SEQUENCE seqRechargeRecordId INCREMENT BY 1 START WITH 1 NOMAXVALUE NOCYCLE NOCACHE;

CREATE SEQUENCE app INCREMENT BY 1 START WITH 1 NOMAXVALUE NOCYCLE NOCACHE;

CREATE SEQUENCE dictionaryType_seq INCREMENT BY 1 START WITH 1 NOMAXVALUE NOCYCLE NOCACHE;

CREATE SEQUENCE dictionary_seq INCREMENT BY 1 START WITH 1 NOMAXVALUE NOCYCLE NOCACHE;

CREATE SEQUENCE admin_seq INCREMENT BY 1 START WITH 1 NOMAXVALUE NOCYCLE NOCACHE;

CREATE SEQUENCE role_seq INCREMENT BY 1 START WITH 1 NOMAXVALUE NOCYCLE NOCACHE;

CREATE SEQUENCE relation_seq INCREMENT BY 1 START WITH 1 NOMAXVALUE NOCYCLE NOCACHE;

CREATE SEQUENCE commodity_seq INCREMENT BY 1 START WITH 1 NOMAXVALUE NOCYCLE NOCACHE;

CREATE SEQUENCE harvestAddressInfo_seq INCREMENT BY 1 START WITH 1 NOMAXVALUE NOCYCLE NOCACHE;

CREATE SEQUENCE order_seq INCREMENT BY 1 START WITH 1 NOMAXVALUE NOCYCLE NOCACHE;
--�����ʽ���ˮid����
CREATE SEQUENCE capitalflow_seq INCREMENT BY 1 START WITH 1 NOMAXVALUE NOCYCLE NOCACHE;

insert into TRole values(role_seq.nextval,'ϵͳ����Ա');
insert into TRole values(role_seq.nextval,'����');
insert into TRole values(role_seq.nextval,'ҵ�����Ա');


insert into TAdmin values(admin_seq.nextval,1,'����','123456');

insert into TJurisdiction values('1','�������ݹ���');
insert into TJurisdiction values(2,'�����ֵ�');
insert into TJurisdiction values(3,'�������');
insert into TJurisdiction values(4,'��֯��������');
insert into TJurisdiction values(5,'������Ʒ�ϴ�');
insert into TJurisdiction values(6,'���ݲ�ѯͳ��');
insert into TJurisdiction values(7,'Ӫҵͳ��');
insert into TJurisdiction values(8,'����Ӫҵͳ��');
insert into TJurisdiction values(9,'Ӫҵ������');
insert into TJurisdiction values(10,'ҵ����˹���');
insert into TJurisdiction values(11,'�ֻ��ײ����');
insert into TJurisdiction values(12,'��Ʒ�������');
insert into TJurisdiction values(13,'�鿴����ҵ��');
insert into TJurisdiction values(14,'ϵͳ����');
insert into TJurisdiction values(15,'�û�����');
insert into TJurisdiction values(16,'��ɫ����');

insert into TRelation values(relation_seq.nextval,1,1);
insert into TRelation values(relation_seq.nextval,2,1);
insert into TRelation values(relation_seq.nextval,3,1);
insert into TRelation values(relation_seq.nextval,4,1);
insert into TRelation values(relation_seq.nextval,5,1);
insert into TRelation values(relation_seq.nextval,6,1);
insert into TRelation values(relation_seq.nextval,7,1);
insert into TRelation values(relation_seq.nextval,8,1);
insert into TRelation values(relation_seq.nextval,9,1);
insert into TRelation values(relation_seq.nextval,10,1);
insert into TRelation values(relation_seq.nextval,11,1);
insert into TRelation values(relation_seq.nextval,12,1);
insert into TRelation values(relation_seq.nextval,13,1);
insert into TRelation values(relation_seq.nextval,14,1);
insert into TRelation values(relation_seq.nextval,15,1);
insert into TRelation values(relation_seq.nextval,16,1);


insert into TAREA values(area.nextval,'����');
insert into TAREA values(area.nextval,'����');
insert into TAREA values(area.nextval,'Ȫ��');

insert into TPACKAGE values(1,59,'�ײ�һ');
insert into TPACKAGE values(2,69,'�ײͶ�');
insert into TPACKAGE values(3,79,'�ײ���');
insert into TPACKAGE values(4,89,'�ײ���');
insert into TPACKAGE values(5,179,'�ײ���');

insert into TUSER values (seqUserId.nextval,'�ȷ�','������','1',24,'664890729',NULL,NULL,NULL,'664890729@qq.com');
insert into TUSER values (seqUserId.nextval,'Ũ��','������','1',24,'353590126',NULL,NULL,NULL,'353590126@qq.com');


INSERT INTO TMOBILECARD (MOBILECARDID, PACKAGEID, USERID,PHONENUMBER,SERVICEPWD,
												COSTBALANCE,REMAININGSCORE, REALNAME,IDCARD,ATTRIBUTION,NUMBERPRICE,APPLICATIONSTATE) 
												VALUES (seqMobileCardId.nextval, 1, null, 13305928319, 133059, 56.2300, 90000, '������', '35038119940605107X', '����', 50, 0);
INSERT INTO TMOBILECARD (MOBILECARDID, PACKAGEID, USERID,PHONENUMBER,SERVICEPWD,
												COSTBALANCE,REMAININGSCORE, REALNAME,IDCARD,ATTRIBUTION,NUMBERPRICE,APPLICATIONSTATE) 
												VALUES (seqMobileCardId.nextval, 1, 10001, 13305928391, 133059, 46.2300, 40000, '������', '35038119942345107X', '����', 50, 0);
INSERT INTO TMOBILECARD (MOBILECARDID, PACKAGEID, USERID,PHONENUMBER,SERVICEPWD,
												COSTBALANCE,REMAININGSCORE, REALNAME,IDCARD,ATTRIBUTION,NUMBERPRICE,APPLICATIONSTATE) 
												VALUES (seqMobileCardId.nextval, null, null, 13305928390, 133059, 0, 0, null, null, '����', 50, 0);

insert into TPrepaidcard values (PREPAIDCARDID_seq.nextval,1,null,30,'123456','δ��',null);
insert into TPrepaidcard values (PREPAIDCARDID_seq.nextval,1,null,30,'123456','δ��',null);
insert into TPrepaidcard values (PREPAIDCARDID_seq.nextval,1,null,30,'123456','δ��',null);
insert into TPrepaidcard values (PREPAIDCARDID_seq.nextval,1,null,50,'123456','δ��',null);
insert into TPrepaidcard values (PREPAIDCARDID_seq.nextval,1,null,50,'123456','δ��',null);
insert into TPrepaidcard values (PREPAIDCARDID_seq.nextval,1,null,50,'123456','δ��',null);
insert into TPrepaidcard values (PREPAIDCARDID_seq.nextval,1,null,100,'123456','δ��',null);
insert into TPrepaidcard values (PREPAIDCARDID_seq.nextval,1,null,100,'123456','δ��',null);
insert into TPrepaidcard values (PREPAIDCARDID_seq.nextval,1,null,100,'123456','δ��',null);
insert into TPrepaidcard values (PREPAIDCARDID_seq.nextval,1,null,100,'123456','δ��',null);

--�޸�oracle���ݿ�Ĭ��DATE����ʵ��ʽ��һ��ֻ�޸ĵ�ǰ�Ự 
ALTER session  SET nls_date_format  = 'YYYY-MM-DD HH24:MI:SS';
insert into TCAPITALFLOW values(CAPITALFLOW_SEQ.nextval,10000,1,0,-1000,sysdate,'������Ʒ');
insert into TCAPITALFLOW values(CAPITALFLOW_SEQ.nextval,10000,1,0,-1000,to_char(sysdate,'yyyy-mm-dd hh24:mi:ss'),'������Ʒ');
insert into TCAPITALFLOW values(CAPITALFLOW_SEQ.nextval,10000,1,0,-1500,to_char(sysdate,'yyyy-mm-dd hh24:mi:ss'),'������Ʒ');
insert into TCAPITALFLOW values(CAPITALFLOW_SEQ.nextval,10000,1,0,100,to_char(sysdate,'yyyy-mm-dd hh24:mi:ss'),'������Ʒ');
insert into TCAPITALFLOW values(CAPITALFLOW_SEQ.nextval,10000,1,0,-1500,to_char(sysdate,'yyyy-mm-dd hh24:mi:ss'),'������Ʒ');
insert into TCAPITALFLOW values(CAPITALFLOW_SEQ.nextval,10000,1,0,100,to_char(sysdate,'yyyy-mm-dd hh24:mi:ss'),'������Ʒ');
