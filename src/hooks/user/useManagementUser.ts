import { useEffect, useRef, useState } from 'react';
import { User } from '../../Interfaces/UserInterface';
import { useFetchUsers } from './useFetchUsers';
import { useSearchUsers } from './useSearchUsers';
import { useDeleteUser } from './useDeleteUser';
import { usePageAndSearch } from '../shared/usePageAndSearch';
import { useScroll } from '../shared/useScroll';
import { showErrorAlert, showSuccessAlert } from '../../utils/showAlertUtils';
import { editUser } from '../../services/userService';

export const useManagementUser = (pageSizeInitial = 20, pageKey = 'usersPage') => {
    const {
        page,
        setPage,
        searchTerm,
        setSearchTerm,
        handleSearchKeyDown
    } = usePageAndSearch(pageKey);

    const [pageSize, setPageSize] = useState(pageSizeInitial);
    const [hasSearched, setHasSearched] = useState(false);

    const searching = hasSearched && searchTerm.trim() !== '';

    const scrollRef = useRef<HTMLDivElement>(null);
    const offset = window.innerWidth < 640 ? 90 : 240;
    useScroll(scrollRef, { deps: [page], behavior: 'smooth', offset });

    const {
        users: backendUsers,
        totalPages: totalPagesBackend,
        isLoading: loadingBackend,
        error: errorBackend,
        reloadUsers,
    } = useFetchUsers(page - 1, pageSize);

    const {
        content: searchUsersList,
        totalPages: totalPagesSearch,
        isLoading: loadingSearch,
        error: errorSearch,
        refresh: refreshSearch,
    } = useSearchUsers(searchTerm, page, pageSize);

    const users = searching ? searchUsersList : backendUsers;
    const isLoading = searching ? loadingSearch : loadingBackend;
    const error = searching ? errorSearch : errorBackend;
    const totalPages = searching ? totalPagesSearch : totalPagesBackend;

    useEffect(() => {
        if (!isLoading && page > totalPages && totalPages > 0) {
            setPage(totalPages);
        }
    }, [isLoading, page, totalPages, setPage]);

    const { handleDelete } = useDeleteUser(searching ? refreshSearch : reloadUsers);

    const toggleStatus = async (user: User) => {
        const newStatus = (user.status ?? 'ACTIVE') === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE';
        try {
            await editUser(user.id, { status: newStatus });
            showSuccessAlert('Estado actualizado', `El álbum fue ${newStatus === 'SUSPENDED' ? 'suspendido' : 'activado'}.`);
            searching ? await refreshSearch() : await reloadUsers();
        } catch {
            showErrorAlert('Error', 'No se pudo cambiar el estado.');
        }
    };

    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);

    const handleEdit = (id: string) => {
        setSelectedUserId(id);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setSelectedUserId(null);
        setShowModal(false);
        searching ? refreshSearch() : reloadUsers();
    };

    const onPageSizeChange = (sz: number) => {
        setPageSize(sz);
        setPage(1);
    };

    const onSearchChange = (val: string) => {
        setSearchTerm(val);
        if (val.trim() === '') {
            setHasSearched(false);
            setPage(1);
        }
    };

    const onSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if (searchTerm.trim() === '') {
                showErrorAlert('Error', 'Por favor ingresá un término para buscar');
                return;
            }
            setHasSearched(true);
            setPage(1);
        }
        handleSearchKeyDown(e);
    };

    return {
        users,
        isLoading,
        error,
        totalPages,
        searching,
        page,
        setPage,
        pageSize,
        setPageSize: onPageSizeChange,
        searchTerm,
        onSearchChange,
        onSearchKeyDown,
        toggleStatus,
        handleDelete,
        showModal,
        selectedUserId,
        reload: searching ? refreshSearch : reloadUsers,
        handleEdit,
        handleCloseModal,
        scrollRef,
    };
};
