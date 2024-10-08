'use client';

import React, { useRef, useState } from 'react';
import { useParams } from 'next/navigation';

import * as com from "@/app/common.js"
import useSellItems from '@/hooks/useSellItems';
import ContextMenu from './ContextMenu';
import ComponentAddButton from '@/app/prime/[category]/[routeId]/subcomponents/ComponentAddButton';
import ItemActionButton from './ItemActionButton';
import ObtainedResurgenceGroup from './ObtainedResurgenceGroup';
import DucatLabel from './DucatLabel';
import ObjectStateLabel from './ObjectStateLabel';
import ResurgenceItemIcon from './ResurgenceItemIcon';
import SellValueLabelObject from './SellValueLabelObject';
import useObtainedExtras from '@/hooks/useObtainedExtras';
import SellItemButtons from './SellItemButtons';

export default function SellItemButton({ positionAbsolute=true, itemId, showLabel=false, alwaysShow=false, alwaysHide=false, mobileAlwaysShow=true, mobileAlwaysHide=false }){
    const [ obtainedExtras, setObtainedExtras ] = useObtainedExtras();
    const [ sellItems, setSellItems ] = useSellItems();


    const rawObj = com.getObjectFromId(itemId);
    if(rawObj.category !== "items" && rawObj.category !== "components") return null;

    const sellValue = rawObj.category === "items" ? 
        com.getItemComponentIds(itemId)
            .reduce((acc, id) => acc += com.getUserDataSellItemValue(id), 0) 
    : 
        com.getUserDataSellItemValue(itemId);

    const isSell = sellValue > 0;

    const isFarmed = com.objectIsFarmed(rawObj);

    // const contextMenuRef = useRef();

    // const pulseShowContextMenu = (showCallback) => {
    //     showCallback();
    // };

    return (
        <>
            <button 
                title={`Sell components`}
                className={`sized-content h-flex sell-button${ positionAbsolute ? ' absolute' : '' }${ alwaysShow ?  ` always-show` : `` }${ alwaysHide ?  ` always-hide` : `` }${ mobileAlwaysShow ?  ` mobile-always-show` : `` }${ mobileAlwaysHide ?  ` mobile-always-hide` : `` } v-flex flex-center`}
                style={{ gap: '5px' }}
                onClick={(ev) => { 
                    ev.stopPropagation(); 
                    ev.preventDefault();

                    const id = itemId;
                                        
                    const sellItem = com.getUserDataSellItem(id) ?? {};

                    // if(!isFarmed && !(com.getUserDataSellItemValue(itemId) > 0)) {
                    //     com.showNotificationUi({
                    //         type: "failure",
                    //         label: "Cannot sell non-farmed element"
                    //     });
                    //     return;
                    // }

                    // com.setUserDataSellItemValue(id, com.getUserDataSellItemValue(itemId) ? 1 : 0);


                    // setShowSellContextMenu(true);
                    // contextMenuRef.current.show({ top: '50px' });

                    const targetBB = ev.target.getBoundingClientRect();

                    com.toggleContextMenuUis({
                        position: { top: `${targetBB.top + 10}px`, left: `${targetBB.left + 10}px` },
                        children: (props) => (
                            <div
                                className='sized-content v-flex flex-center'
                                style={{ cursor: 'default', borderRadius: '10px', padding: '10px', alignSelf: 'stretch', gap: '20px' }}
                                onClick={(ev) => { ev.stopPropagation(); ev.preventDefault(); }}
                            >
                                <div className='sized-content h-flex flex-center' style={{ whiteSpace: 'pre' }}>Sell {rawObj.fullName ?? rawObj.name}{ rawObj.category !== "items" ? null: '\'s duplicates' }</div>
                                <div 
                                    className='sized-content h-flex flex-center'
                                    style={{ 
                                        borderRadius: '10px', 
                                        padding: '10px',
                                        alignSelf: 'stretch', 
                                        gap: '20px',
                                        flexWrap: 'wrap'
                                    }}
                                >
                                    {
                                        (rawObj.category === "items" ? com.getItemComponents(rawObj.id) : [ rawObj ])
                                            .map((component, index) => { 
                                                const componentIsAnomalous = component.required <= 0; 
                                                // const hasDuplicates = com.getUserDataExtrasObtained(component.id); 
                                                return (
                                                    <div 
                                                        key={`${index}-${component.id}`} 
                                                        className='sized-content v-flex flex-center' 
                                                        style={{ alignSelf: 'stretch', gap: '5px' }}
                                                    >
                                                        <div 
                                                            // onClick={() => router.push(component.route)}
                                                            className={`sized-remaining item-page-component-container item-check-parent tracker-item-parent v-flex flex-center${` ${com.getComponentRarity(component)}` ?? ''}`}
                                                            style={{
                                                                gap: '5px',
                                                                position: 'relative',
                                                                cursor: 'pointer',
                                                                alignSelf: 'stretch',
                                                                minWidth: '80px'
                                                            }}
                                                        >
                                                            <div className='sized-content h-flex flex-center'><img style={{ width: '80px', height: '80px', objectFit: 'contain' }} src={`${com.getBaseEnvPath().basePath}/images/${component.fullName}.png`}/></div>
                                                            <div className='sized-content v-flex flex-center' style={{ gap: '1px' }}>
                                                                <div className='sized-content h-flex flex-center' style={{ fontSize: 'small', minWidth: 'fit-content', textAlign: 'center' }}>{component.name}</div>
                                                                {/* <div className='sized-content h-flex flex-center' style={{ fontSize: 'small', fontStyle: 'italic', minWidth: 'fit-content' }}>{`${com.getUserDataComponentSetting(component.rawObj.id, "obtained") ?? '0'}/${component.rawObj.required}`}</div> */}
                                                                {/* { componentIsAnomalous ? null : <div className='sized-content h-flex flex-center' style={{ fontSize: 'small', fontStyle: 'italic', minWidth: 'fit-content' }}>{`${obtainedComponents && obtainedComponents[component.rawObj.id] ? obtainedComponents[component.rawObj.id].obtained : '0'}/${component.rawObj.required}`}</div>} */}
                                                                { componentIsAnomalous ? null : <ObjectStateLabel object={component}/> }
                                                            </div>
                                                            {/* <ItemActionButton itemId={component.id}/> */}
                                                            <ResurgenceItemIcon positionAbsolute={false} itemId={itemId}/>
                                                            <DucatLabel rawObj={component}/>
                                                        </div>
                                                        <SellItemButtons component={component}/>
                                                        <SellValueLabelObject object={component} collapseWhenNull={false}/>
                                                    </div>
                                                )
                                            })
                                    }
                                </div>
                                {/* <div
                                    className='sized-content h-flex flex-center'
                                    style={{
                                        gap: '5px'
                                    }}
                                >
                                    <button className='sized-content h-flex sell-pane-button'>Confirm</button>
                                    <button className='sized-content h-flex sell-pane-button'>Cancel</button>
                                </div> */}
                            </div>
                        )
                    });
                }}
            >
                <img 
                    src={ isSell ? `${com.getBaseEnvPath().basePath}/icons/sell_filled.svg` : `${com.getBaseEnvPath().basePath}/icons/sell_hollow.svg`} 
                    className={`sized-content sell-button-icon flex-center${ isSell ? ` sell` : `` }${ alwaysShow ?  ` always-show` : `` }${ alwaysHide ?  ` always-hide` : `` }${ mobileAlwaysShow ?  ` mobile-always-show` : `` }${ mobileAlwaysHide ?  ` mobile-always-hide` : `` }`}
                    style={{

                    }}
                />
                { !(sellValue > 0) ? null: <span className='sized-content h-flex flex-center' style={{ marginBottom: '2px', fontSize: 'small', fontStyle: 'italic' }}>{sellValue}</span> }
                { !showLabel ? null: <span className='sized-content h-flex flex-center' style={{ marginBottom: '2px', fontSize: 'small' }}>Sell Items</span> }
            </button>
        </>
    );
}