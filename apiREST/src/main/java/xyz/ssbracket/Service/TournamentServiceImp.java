package xyz.ssbracket.Service;

import xyz.ssbracket.Model.Tournament;
import xyz.ssbracket.Model.User;
import xyz.ssbracket.Model.TournamentArray;
import xyz.ssbracket.Model.MatchResult;
import xyz.ssbracket.Repository.UserRepository;
import xyz.ssbracket.Repository.TournamentRepository;
import xyz.ssbracket.Repository.TournamentArrayRepository;
import xyz.ssbracket.Repository.MatchResultRepository;
import xyz.ssbracket.Exception.ResourceNotFoundException;
import xyz.ssbracket.Exception.DuplicateResourceFoundException;
import xyz.ssbracket.Service.MatchService;

import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.ArrayList;

import xyz.ssbracket.Commands.*;

@SuppressWarnings("unchecked")
@Service
public class TournamentServiceImp extends TournamentService {

    @Autowired
    private TournamentRepository tournamentRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private TournamentArrayRepository tournamentArrayRepository;
    @Autowired
    private MatchService matchMainService;
    @Autowired
    private MatchResultRepository matchResultRepository;

    @Override
    public Page<Tournament> getAll( Pageable pageable ) {
        return tournamentRepository.findAll( pageable );
    }

    @Override
    public Page<Tournament> searchTournamentName( Pageable page, Tournament tname ) {
        return tournamentRepository.findByTname(tname.getTname(), page);
    }

    @Override
    public Tournament add( Tournament o ) throws ResourceNotFoundException{
      return new TournamentAdd(tournamentRepository, tournamentArrayRepository, o, userRepository, matchResultRepository).execute();
    }

    //maybe changes are needed
    @Override
    public Tournament update( Tournament o, int id ) throws ResourceNotFoundException {
        return new TournamentUpdate(tournamentRepository, id, o).execute();
    }

    @Override
    public Tournament addUsers( User o, int id ) throws ResourceNotFoundException {
        return new TournamentAddUsers(tournamentRepository, tournamentArrayRepository, userRepository, o, id).execute();
    }

    @Override
    public Tournament deleteUsers( User o, int id ) throws ResourceNotFoundException {
        return new TournamentDeleteUsers(tournamentRepository, tournamentArrayRepository, userRepository, o, id).execute();
    }


    @Override
    public Tournament getById( int id ) throws ResourceNotFoundException {
      return new TournamentGetId(tournamentRepository,id).execute();
    }

    @Override
    public Tournament deleteById( int id ) throws ResourceNotFoundException {
        return new TournamentDeleteId(tournamentRepository, tournamentArrayRepository, id).execute();
    }

    @Override
    public Tournament setChampion(Tournament myTournamentRequest, int id)throws ResourceNotFoundException {
      return new TournamentSetChampion(tournamentRepository, tournamentArrayRepository, userRepository, myTournamentRequest, id).execute();
    };

    @Override
    public Tournament addVisit(int id) throws ResourceNotFoundException{
      return new TournamentAddVisit(tournamentRepository, id).execute();
    }

    @Override
    public Tournament handleCloseTournament(Tournament myTournamentRequest, int id) throws ResourceNotFoundException{
      return new TournamentClose(tournamentRepository, id, myTournamentRequest).execute();
    };

}
