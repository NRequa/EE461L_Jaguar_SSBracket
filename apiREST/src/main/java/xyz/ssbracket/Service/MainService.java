package xyz.ssbracket.Service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface MainService <T, U> {
    Page<T> getAll(Pageable pageable);
    T add( T o);
    T updateSelf (T o, int id);
    T updateList (U o, int id);
    T getById( int id );
    T deleteById(int id);
}
