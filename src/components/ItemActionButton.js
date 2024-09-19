'use client';

import React from 'react';
import { useParams } from 'next/navigation';

import useTrackedItems from '@/hooks/useTrackedItems.js'

import * as com from "@/app/common.js"
import useGlobalMode from '@/hooks/useGlobalMode';
import TrackItemButton from './TrackItemButton';
import SellItemButton from './SellItemButton';

export default function ItemActionButton({ positionAbsolute=true, itemId }){
    const [ trackedItems, setTrackedItems ] = useTrackedItems();

    const [ globalMode, setGlobalMode ] = useGlobalMode();
    const isFarmMode = globalMode == null || globalMode === "farmMode";

    if(!isFarmMode) return (<SellItemButton positionAbsolute={positionAbsolute} itemId={itemId}/>);
    else return (<TrackItemButton positionAbsolute={positionAbsolute} itemId={itemId}/>);
}