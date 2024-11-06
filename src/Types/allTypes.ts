import { ChangeEventHandler, ReactNode } from "react";

export interface AccordianFieldInfoType {
    title: string;
    isOptional: boolean;
    fields?: listTextFieldType[];
    accordionDetails?: React.ReactNode;
}

export interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (userData: FormData) => Promise<boolean>;
    logout: () => void;
}

export interface AuthenticatedLayoutProps {
    children: ReactNode;
}

export interface BusinessCardProps {
    id: string;
    image: string;
    businessName: string;
    businessCatagory: string;
    businessDescription: string;
    rating?: Rating;
    onDashboard?: boolean;
}

export interface BusinessFormProps {
    categories?: Category[];
}

export interface Rating {
    value: number;
    reviewCount: number;
}

export interface Business {
    _id: string;
    name: string;
    email: string;
    phone: string;
    address: BusinessAddress;
    photoUrls: string[];
    website: string;
    category: Category;
    subcategory: Subcategory;
    listingUserId: string;
    description: string;
    hours?: Record<string, { checked: boolean; start: string; end: string }>;
    ratings: Rating;
    tags: string[];
    offerings: BusinessOffering[];
    socialMedia: SocialMedia;
    authorizedUsers: string[];
}

export interface BusinessOffering {
    type: string;
    name: string;
    price: Price;
    description: string;
}

export interface Category {
    _id: string;
    name: string;
    image: string;
    description: string;
    numBusiness: number;
    subcategories: Subcategory[];
}

export interface CategoryCardProps {
    image: string;
    name: string;
    numBusiness: number;
}

export interface CategorySectionListProps {
    checked: string[];
    setChecked: (checked: string[]) => void;
    filteredCategory?: Category;
    categoryData: Category[];
}

export interface Comment {
    _id: string;
    content: string;
    avatar: string;
    name: string;
    createdAt: string;
    userId: string;
}

export interface DeleteAccountProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    handleOnClose: () => void;
    handleOnSubmit: (event: React.FormEvent) => void;
    title: string;
    description: string;
    description2?: string; // optional
    cancelButtonName?: string; // optional
    submitButtonName?: string; // optional
}

export interface FeaturedBusiness {
    _id: string;
    photoUrls: string[];
    name: string;
    category: string;
    subcategory: {
        name: string;
    };
    rating: Rating;
    description: string;
}

export interface gridSize {
    xs: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
}

export interface ImageDisplayProps {
    images: string[];
}

export interface ImageUploadProps {
    imagePreviews: string[];
    handleImageChange: (files: File[]) => void;
    handleRemoveImage: (index: number) => void;
    reviewUpload: boolean;
}

export interface listSelectFieldType {
    gridSize: gridSize;
    labelName: string;
    value: string;
    isRequired: boolean;
    optionsList: selectOption[];
    onChange: ChangeEventHandler<HTMLInputElement> | ChangeEventHandler<HTMLInputElement>;
    selectValue: boolean;
}

export interface listTextFieldType {
    display?: string;
    gridSize: gridSize;
    name?: string;
    labelName: string;
    value: string;
    onChange: ChangeEventHandler<HTMLInputElement> | ChangeEventHandler<HTMLInputElement>;
    isRequired: boolean;
    isMultiline?: boolean;
    isDisabled?: boolean;
}

export interface ListingUser {
    firstname?: string;
    lastname?: string;
    phone?: string;
    email?: string;
}

export interface LoadingOverlayProps {
    isLoading: boolean;
    children?: ReactNode;
}

export interface MultiSelectTagsProps {
    options: string[];
    selectedTags: string[];
    handleTagClick: (tag: string) => void;
}

export interface Post {
    _id: string;
    businessName: string;
    businessId: string;
    userId: string;
    content: string;
    avatar: string;
    likes?: string[];
    comments: Comment[];
    media?: string[];
    createdAt: string;
}

export interface Price {
    currency: string;
    value: string;
}

export interface Review {
    _id: string;
    title: string;
    content: string;
    images?: string[];
    rating: number;
    userId: string;
    avatar: string;
    username: string;
    businessId: string;
    createdAt?: string | Date;
}

export interface ReviewComponentProps {
    businessId: string;
    userId: string;
}

export interface selectOption {
    _id: string;
    name: string;
}

export interface SocialMedia {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
    youtube?: string;
}

export interface Subcategory {
    _id: string;
    parentCategory: string;
    name: string;
    description: string;
    numBusiness: number;
}

export interface SuccessDialogProps {
    title: string;
    description: string;
    description2?: string; // Optional
    actionName: string;
    actionFunction: () => void;
    open: boolean;
    setOpen: (open: boolean) => void;
}

export interface ThemeProviderWrapperProps {
    children: ReactNode;
}

export interface User {
    _id: string;
    avatar: string;
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    bio: string;
    isAdmin: boolean;
}

export interface UserInfoState {
    request: {
        loading: boolean;
        token: string | null;
        error: string | null;
        data: User | null;
        editSuccess: boolean;
        isDeleted: boolean;
        isPasswordUpdated: boolean;
    };
}

export interface CategoryInfoState {
    request: {
        loading: boolean;
        error: string | null;
        data: Category[] | null;
    };
}

export interface FetchBusinessInfoState {
    request: {
        loading: boolean;
        error: string | null;
        data: Business[] | null;
    };
}

export interface ReviewInfoState {
    request: {
        loading: boolean;
        error: string | null;
        data: Review[] | null;
    };
}

export interface BusinessInfoState {
    request: {
        loading: boolean;
        error: string | null;
        success: boolean;
    };
}

export interface PostsInfoState {
    request: {
        loading: boolean;
        error: string | null;
        data: Post[] | null;
    };
}

export interface BusinessAddress {
    isVirtualOnly: boolean;
    street: string;
    city: string;
    province: string;
    postalCode: string;
    country: string;
}

export enum Animations {
    NO_POSTS = "noPosts",
    UNAUTHORIZED = "unauthorized",
    NOT_FOUND = "notFound",
    CELEBRATE = "celebrate",
    LOCK = "lock",
}

export interface AnimationProps {
    animationData: Animations;
    size: { width: number; height: number };
}


export enum NotificationTypes {
    LIKE = "like",
    COMMENT = "comment",
    REVIEW = "review",
    BUSINESS = "business",
    POST = "post",
    FOLLOW = "follow",
}

export interface Notification {
    _id: string;
    title: string;
    content: string;
    read: boolean;
    userId: string;
    type: NotificationTypes;
    typeId: string;
    updatedAt: string;
    createdAt: string;
}

export interface NotificationInfoState {
    request: {
        loading: boolean;
        error: string | null;
        data: Notification[] | null;
    };
}